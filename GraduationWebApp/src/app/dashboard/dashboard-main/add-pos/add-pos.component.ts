import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { POSService } from 'src/app/services/POS/pos.service';

@Component({
  selector: 'app-add-pos',
  templateUrl: './add-pos.component.html',
  styleUrls: ['./add-pos.component.scss']
})
export class AddPosComponent implements OnInit {

  responseMessage = ""

  PosForm: FormGroup =this.formBuilder.group({
    Name: ["",[Validators.required, Validators.minLength(3)]],
  })

  formErrors:any ={
    "Name": ""
  }

  validationMessege:any = {
    "Name":  {
      "required": "This field is Required",
      "minlength": "The Minimum length for this field is 3 Characters",
    },
  }

  constructor(public formBuilder:FormBuilder, public posService: POSService, private DialogRef:MatDialogRef<AddPosComponent>) { }

  ngOnInit(): void {
    this.PosForm.valueChanges.subscribe(data => this.onValueChange(data))
    this.onValueChange()
  }

  onSubmit(){
    
    var name = this.PosForm.get("Name")?.value
    this.posService.postAddPOS(name).subscribe(result => {
      if(result.isSuccessfull){
        this.DialogRef.close()
      }
      else{
        this.responseMessage = result.message
      }
    })
  }

  onValueChange(data?:any){
    console.log
    if(!this.PosForm){return}
    const form = this.PosForm;
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

}
