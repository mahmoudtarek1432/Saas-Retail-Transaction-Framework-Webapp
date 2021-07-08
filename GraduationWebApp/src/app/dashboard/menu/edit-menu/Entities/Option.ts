import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuItemOptions, WriteMenuItemOptions } from "src/app/shared/Dto/MenuItemOptions";

export class OptionForm{

    constructor(private formBuilder: FormBuilder){

    }

    static MenuItemOptionsFormGroup(formBuilder: FormBuilder, option:MenuItemOptions):FormGroup{
        return formBuilder.group({
          Name: [option.name,[Validators.required, Validators.minLength(3)]],
    
          Price: [option.price,[Validators.required, Validators.pattern(/^[.\d]+$/)]],
    
          Code: [option.code,[Validators.required, Validators.maxLength(4)]]
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