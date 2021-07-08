import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/Account/account.service';
import { RegisterAccount } from '../shared/Dto/RegisterAccount';
import { Globals } from '../shared/global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  responseMessage = ""
  step: number = 1;

  registerForm = this.formBuilder.group({
    Name : ["",[Validators.required, Validators.minLength(2),Validators.pattern]],
    Email: ["",[Validators.required, Validators.email]],
    Password : ["",[Validators.required, Validators.minLength(8),Validators.pattern]],
    ConfirmPassword : ["",[Validators.required]],
   // PGPKey : ["",[Validators.required]]
  })

  formErrors:any={
    'Name':'',
    'Email':'',
    'Password':'',
    'ConfirmPassword':'',
    "PGPKey":''
  }

  validationMessage:any ={
    'Name':{
      'required':'This Field Is Required',
      'minlength':'The Minimum Length for this field is 2 characters',
      'pattern':'The password should consist of and Uppercase, Lowercase, Numbers'
    },
    'Email':{
      'required':'This Field Is Required',
      'email':'Wrong Email Format'
    },
    'Password':{
      'required':'This Field Is Required',
      'minlength':'The Minimum Length for this field is 8 characters',
      'pattern':'The password should consist of and Uppercase, Lowercase, Numbers'
    },
    'ConfirmPassword':{
      'required':'This Field Is Required',
      'notSame':'Password is diffrenet'
    },
    /*"PGPKey": {
      'required':'This Field Is Required'
    }*/
  }

  constructor(public formBuilder: FormBuilder, public accountService:AccountService, public globals: Globals, public router:Router) { }

  ngOnInit(): void {
    this.createForm();
    this.registerForm?.valueChanges.subscribe((data)=> this.onValueChange(data));
    this.onValueChange()
  }

  createForm(){

    this.registerForm.get("ConfirmPassword")?.setErrors({
      notSame: true,
      required: true
    })
  }

  onSubmit(subscriptionType:number){
    var body = new RegisterAccount();
    body.Name = this.registerForm.get("Name")?.value;
    body.Email = this.registerForm.get("Email")?.value;
    body.Password = this.registerForm.get("Password")?.value;
    body.ConfirmPassword = this.registerForm.get("ConfirmPassword")?.value;
   //body.PublicKey = this.registerForm.get("PGPKey")?.value;

    this.globals.updateLoaderToggled(true)
    this.accountService.RegisterAccount(body).subscribe(result => {
      if(result.isSuccessfull){
        this.responseMessage = "Account made successfully, please check your email"
        this.registerForm.reset();
        this.globals.updateLoaderToggled(false)
      }
      else{
        this.responseMessage = result.message
        this.globals.updateLoaderToggled(false)
      }
    })
  }

  openSubscriptions(){
    this.step = 2;
  }


  onValueChange(data?:any){
    console.log
    if(!this.registerForm){return}
    const form = this.registerForm;
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
              this.formErrors[field] += (this.formErrors[field] != '')?'<br>'+ messages[key] + ' ': ''+ messages[key] + ' ';
              console.log(this.formErrors[field])
            }
          }
        }
      }
    }
  }

  navigate(url: string){
    this.router.navigateByUrl(url)
  }
}
