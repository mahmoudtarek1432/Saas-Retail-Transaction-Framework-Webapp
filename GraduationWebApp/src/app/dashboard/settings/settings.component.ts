import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SettingsService } from 'src/app/services/settings/settings.service';
import { UploadService } from 'src/app/services/UploadImage/upload.service';
import { Settings } from 'src/app/shared/Dto/Settings';
import { Globals } from 'src/app/shared/global';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  ImageFile!:File;

  settings!:Settings
  color:string = '#fafafa';

  responseMessage = ""

  SettingsForm = this.formBuilder.group({
    PrimaryColor : ["",[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern]],
    SecondaryColor: ["",[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern]],
    AccentColor : ["",[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern]],
    LabelColor : ["",[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern]],
    MainTextColor : ["",[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern]],
    BrandName : ["",[Validators.required]],
  })

  formErrors:any={
    'PrimaryColor':'',
    'SecondaryColor':'',
    'AccentColor':'',
    'LabelColor':'',
    "MainTextColor":'',
    "BrandName":''
  }

  validationMessage:any ={
    'PrimaryColor':{
      'required':'This Field Is Required',
      'minlength':'The Hex Color length should be 6 characters',
      'maxlength':'The Hex Color length should be 6 characters',
      'pattern':'only Characters a-f A-f 0-9 are valid'
    },
    'SecondaryColor':{
      'required':'This Field Is Required',
      'minlength':'The Hex Color length should be 6 characters',
      'maxlength':'The Hex Color length should be 6 characters',
      'pattern':'only Characters a-f A-f 0-9 are valid'
    },
    'AccentColor':{
      'required':'This Field Is Required',
      'minlength':'The Hex Color length should be 6 characters',
      'maxlength':'The Hex Color length should be 6 characters',
      'pattern':'only Characters a-f A-f 0-9 are valid'
    },
    'LabelColor':{
      'required':'This Field Is Required',
      'minlength':'The Hex Color length should be 6 characters',
      'maxlength':'The Hex Color length should be 6 characters',
      'pattern':'only Characters a-f A-f 0-9 are valid'
    },
    "MainTextColor":{
      'required':'This Field Is Required',
      'minlength':'The Hex Color length should be 6 characters',
      'maxlength':'The Hex Color length should be 6 characters',
      'pattern':'only Characters a-f A-f 0-9 are valid'
    },
    "BrandName":{
      'required':'This Field Is Required'
    }
  }

  constructor(private settingsService:SettingsService, public globals: Globals, private formBuilder: FormBuilder, private UploadService:UploadService) { 
    globals.updateLoaderToggled(true);
    settingsService.getUserSettings().subscribe(result => {
      if(result.isSuccessfull){
        this.settings = result.responseObject
        globals.updateLoaderToggled(false);

        console.log(this.settings)

        this.SettingsForm.get("PrimaryColor")?.setValue(this.settings.primaryColor)
        this.SettingsForm.get("SecondaryColor")?.setValue(this.settings.secondaryColor)
        this.SettingsForm.get("AccentColor")?.setValue(this.settings.accentColor)
        this.SettingsForm.get("LabelColor")?.setValue(this.settings.labelColor)
        this.SettingsForm.get("MainTextColor")?.setValue(this.settings.mainTextColor)
        this.SettingsForm.get("BrandName")?.setValue(this.settings.brandName)

        console.log( this.SettingsForm)
      }
    },(err:HttpErrorResponse) => {
      alert(err.message);
      globals.updateLoaderToggled(false);
    })
  }

  ngOnInit(): void {
    this.SettingsForm?.valueChanges.subscribe((data)=> this.onValueChange(data));
    this.onValueChange()
  }

  ChangeImage(input:any){
    var file = <File>input.files[0];
    console.log(file)
    
    this.ImageFile = file
  }

  onChangeColor(event:any,colorBlock:any){
    colorBlock.style.backgroundColor = "#"+event.target.value
  }


  onValueChange(data?:any){
    console.log
    if(!this.SettingsForm){return}
    const form = this.SettingsForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        
        const control = form.get(field);
        if(field == 'ConfirmPassword'){
          if(form.get(field)?.value != form.get('Password')?.value){
            control?.setErrors({notSame: false})
          }else{
            control?.clearValidators()
          }
        }
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessage[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] = ''+ messages[key] + ' ';
              console.log(this.formErrors[field])
            }
          }
        }
      }
    }
  }

  onSubmit(){
    var body:Settings = new Settings()

    body.primaryColor = this.SettingsForm.get("PrimaryColor")?.value
    body.secondaryColor = this.SettingsForm.get("SecondaryColor")?.value
    body.accentColor = this.SettingsForm.get("AccentColor")?.value
    body.labelColor = this.SettingsForm.get("LabelColor")?.value
    body.mainTextColor = this.SettingsForm.get("MainTextColor")?.value
    body.brandName = this.SettingsForm.get("BrandName")?.value
    var theme:any =  document.getElementById("theme")!;
    body.themeId = parseInt(theme.value);
    
    var Mode:any =  document.getElementById("TerminalMode")!;
    body.TerminalModeId = parseInt(Mode.value);

    console.log(this.ImageFile)
    this.globals.updateLoaderToggled(true);
    if(this.ImageFile === undefined){
      body.icon = this.settings.icon
      this.sendRequest(body)
      
    }
    else{
      var formData = new FormData();
      formData.append("file",this.ImageFile,this.ImageFile.name);
      this.UploadService.uploadImage(formData).subscribe(result =>{
        if(result.isSuccessfull){
          body.icon = result.responseObject
        }
        else{
          alert("Image is Corrupted")
        }
        this.sendRequest(body)
      })
    }
  }

  sendRequest(body:any){
    this.settingsService.UpdateUserSettings(body).subscribe(result =>{
      if(result.isSuccessfull){
        this.globals.updateLoaderToggled(false);
      }
      else{
        alert(result.message)
        this.globals.updateLoaderToggled(false);
      }
    }),
    (err:HttpErrorResponse) => {
      alert(err.message)
      this.globals.updateLoaderToggled(false);
    }
  }
}
