import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from '../services/Account/account.service';
import { LoginAccount } from '../shared/Dto/LoginAccount';
import { Globals } from '../shared/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  responseMessage = ""

  loginForm: FormGroup =this.formBuilder.group({
    Email: ["",[Validators.required, Validators.email]],
    Password : ["",[Validators.required, Validators.minLength(8),Validators.pattern]],
  })

  formErrors:any ={
    "Email": "",
    "Password": ""
  }

  validationMessege:any = {
    "Email": {
      "required": "This field is Required",
      "email": "Invalid Email Form"
    },
    "Password":  {
      "required": "This field is Required",
      "minlength": "The Minimum length for this field is 8 Characters",
      "pattern": "The field should have a "
    },
  }

  constructor(public formBuilder: FormBuilder, public globals: Globals, public accountService:AccountService,
     public cookieService: CookieService, public router: Router, public activateRoute: ActivatedRoute) { 
    this.formErrors.isValid
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(data => this.onValueChange(data))
    this.onValueChange()
  }

  onSubmit(){
    var body = new LoginAccount();
    body.Email = this.loginForm.get("Email")?.value;
    body.Password = this.loginForm.get("Password")?.value;

    this.globals.updateLoaderToggled(true)
    this.accountService.Login(body).subscribe(result => {
      if(result.isSuccessfull){
        this.responseMessage = "User Logged In"
        this.loginForm.reset();
        this.globals.updateLoaderToggled(false)
        localStorage.setItem('ApiAccessToken',result.responseObject)
        console.log(localStorage.getItem('ApiAccessToken'))
        console.log(result.responseObject)
        this.router.navigate(['/Dashboard'],{
          relativeTo: this.activateRoute.root
        })
        /// go to dashboard
      }
      else{
        this.responseMessage = result.message
        this.globals.updateLoaderToggled(false)
      }
    })
  }

  onValueChange(data?:any){
    console.log
    if(!this.loginForm){return}
    const form = this.loginForm;
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

  navigate(url: string){
    this.router.navigateByUrl(url)
  }
}
