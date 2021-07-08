import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { MenuService } from 'src/app/services/Menu/menu.service';
import { POSService } from 'src/app/services/POS/pos.service';
import { UploadService } from 'src/app/services/UploadImage/upload.service';
import { Globals } from 'src/app/shared/global';
import { CategoryForm } from './Entities/Category';
import { ExtrasForm } from './Entities/Extra';
import { MenuForm } from './Entities/Menu';
import { OptionForm } from './Entities/Option';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {

  ItemImage!:File;

  responseMessage = ""

  InputForm!: FormGroup;

  formErrors:any ;

  validationMessege:any;

  constructor(public formBuilder:FormBuilder, public MenuService: MenuService, private UploadService:UploadService, private DialogRef:MatDialogRef<AddMenuComponent>,
     @Inject(MAT_DIALOG_DATA) public data: {ref:string, type:number}, private globals:Globals) //a ref is a guid for the parent, type stands for type of entity
      {
        if(data.type == 1){ // category
          this.InputForm = CategoryForm.categoryFormGroup(formBuilder);
          this.validationMessege = CategoryForm.CategoryValidationMessages();
          this.formErrors = CategoryForm.CategoryErrors();
        }
        if(data.type == 2){ // menu Item
          this.InputForm = MenuForm.MenuItemFormGroup(formBuilder);
          this.validationMessege = MenuForm.MenuItemValidationMessages();
          this.formErrors = MenuForm.MenuItemErrors();
        }
        if(data.type == 3){ // option
          this.InputForm = OptionForm.MenuItemOptionsFormGroup(formBuilder);
          this.validationMessege = OptionForm.MenuItemOptionsValidationMessages();
          this.formErrors = OptionForm.MenuItemOptionsErrors;
        }
        if(data.type == 4){ // Extra
          this.InputForm = ExtrasForm.MenuItemExtrasFormGroup(formBuilder);
          this.validationMessege = ExtrasForm.MenuItemExrasValidationMessages();
          this.formErrors = ExtrasForm.MenuItemExrasErrors();
        }
      }

  ngOnInit(): void {
    console.log(this.validationMessege)
    this.InputForm.valueChanges.subscribe(data => this.onValueChange(data))
    this.onValueChange()
  }

  onValueChange(data?:any){
    console.log
    if(!this.InputForm){return}
    const form = this.InputForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessege[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += (this.formErrors[field] != '')?'<br>'+ messages[key] + ' ': ''+ messages[key] + ' ';
              console.log(this.formErrors[field])
            }
          }
        }
      }
    }
  }

  ChangeImage(input:any){
    var file = <File>input.files[0];
    console.log(file)
    
    this.ItemImage = file
  }

  Submit(){
    var body: any;
    if(this.data.type == 1){ // category
      body = CategoryForm.HttpRequestBody(this.InputForm,this.data.ref);
    }
    else if(this.data.type == 2){ // menu Item
      body = MenuForm.HttpRequestBody(this.InputForm,this.data.ref);
    }
    else if(this.data.type == 3){ // option
      body = OptionForm.HttpRequestBody(this.InputForm,this.data.ref);
    }
    else if(this.data.type == 4){ // Extra
      body = ExtrasForm.HttpRequestBody(this.InputForm,this.data.ref)
    }
    body.price = parseFloat(body.price);
    console.log(this.ItemImage)
    console.log(body)
    if(this.ItemImage === undefined){
      this.sendItemRequest(body)
    }
    else{
      
      var formData = new FormData();
      formData.append("file",this.ItemImage,this.ItemImage.name);
      this.globals.updateLoaderToggled(true);
      this.UploadService.uploadImage(formData).subscribe(result => {
        if(result.isSuccessfull){
          body.image = result.responseObject
        }
        this.sendItemRequest(body)
      },(err)=>{
        this.responseMessage = "image Corupt"
        this.globals.updateLoaderToggled(false);
      })
    }
  }

  sendItemRequest(body:any){
    if(this.data.type == 1){
      this.MenuService.PostCreateCategory(body).subscribe(result =>{
        if(result.isSuccessfull){
          this.DialogRef.close({data: result.responseObject})
        }
        else{
          this.responseMessage = result.message
        }
        this.globals.updateLoaderToggled(false);
      },
      (err) => {
        this.globals.updateLoaderToggled(false);
      });
    }
    if(this.data.type == 2){
      this.MenuService.PostCreateMenuItem(body).subscribe(result =>{
        if(result.isSuccessfull){
          this.DialogRef.close({data: result.responseObject})
        }
        else{
          this.responseMessage = result.message
        }
        this.globals.updateLoaderToggled(false);
      },
      (err) => {
        this.globals.updateLoaderToggled(false);
      });
    }
    if(this.data.type == 3){
      this.MenuService.PostCreateMenuItemOption(body).subscribe(result =>{
        if(result.isSuccessfull){
          this.DialogRef.close({data: result.responseObject})
        }
        else{
          this.responseMessage = result.message
        }
        this.globals.updateLoaderToggled(false);
      },
      (err) => {
        this.globals.updateLoaderToggled(false);
      });
    }
    if(this.data.type == 4){
      this.MenuService.PostCreateMenuItemExtra(body).subscribe(result =>{
        if(result.isSuccessfull){
          this.DialogRef.close({data: result.responseObject})
        }
        else{
          this.responseMessage = result.message
        }
        this.globals.updateLoaderToggled(false);
      },
      (err) => {
        this.globals.updateLoaderToggled(false);
      });
    }
  }
}
