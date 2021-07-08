import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WriteMenuItemOptions } from "src/app/shared/Dto/MenuItemOptions";

export class OptionForm{

    constructor(private formBuilder: FormBuilder){

    }

    static MenuItemOptionsFormGroup(formBuilder: FormBuilder):FormGroup{
        return formBuilder.group({
          Name: ["",[Validators.required, Validators.minLength(3)]],
    
          Price: ["",[Validators.required, Validators.pattern(/^[.\d]+$/)]],
    
          Code: ["",[Validators.required, Validators.maxLength(4)]]
        })
      }

      static MenuItemOptionsValidationMessages(){
        var validationMessege = {
          "Name":  {
            "required": "This field is Required",
            "minlength": "The Minimum length for this field is 3 Characters",
          },
          "Price": {
            "required": "This field is Required",
            "minlength": "This Field Can Consist of only numbers",
          },
    
          "Code": {
            "required": "This field is Required",
            "maxlength": "The Maximum length for this field is 4 Characters",
          },
        }
        return validationMessege
      }

      static MenuItemOptionsErrors(){
        var validationMessege = {
          "Name": "",
    
          "Price": "",
    
          "Code": "",
        }
        return validationMessege
      }

      static HttpRequestBody(inputForm:FormGroup,RefId:string):any{
      
        var Name = inputForm.get("Name")?.value
        var Price = inputForm.get("Price")?.value
        var Code = inputForm.get("Code")?.value
    
        var body = new WriteMenuItemOptions("1",RefId,Name,Price,true,Code)
        return body
      }
}