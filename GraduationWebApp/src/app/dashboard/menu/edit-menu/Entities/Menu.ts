import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuItem, WriteMenuItem } from "src/app/shared/Dto/MenuItem";

export class MenuForm{
    constructor(){

    }

    static MenuItemFormGroup(formBuilder: FormBuilder, menuItem:MenuItem):FormGroup{
    return formBuilder.group({
      Name: [menuItem.name,[Validators.required, Validators.minLength(3)]],

      Price: [menuItem.price,[Validators.required, Validators.pattern(/^[.\d]+$/)]],

      Description: [menuItem.description,[Validators.required, ]],

      Code: [menuItem.code,[Validators.required, Validators.maxLength(4)]]
    })
  }

  static MenuItemValidationMessages(){
    var validationMessege = {
      "Name":  {
        "required": "This field is Required",
        "minlength": "The Minimum length for this field is 3 Characters",
      },
      "Price": {
        "required": "This field is Required",
        "pattern": "This Field Can Consist of only numbers",
      },

      "Description": {
        "required": "This field is Required",
      },

      "Code": {
        "required": "This field is Required",
        "maxlength": "The Maximum length for this field is 4 Characters",
      },
    }
    return validationMessege
  }

  static MenuItemErrors(){
    var validationMessege = {
      "Name":  "",

      "Price": "",

      "Description": "",

      "Code": "",
    }
    return validationMessege
  }

  static HttpRequestBody(inputForm:FormGroup,RefId:string):any{
      
    var Name = inputForm.get("Name")?.value
    var Price = inputForm.get("Price")?.value
    var Description = inputForm.get("Description")?.value
    var Code = inputForm.get("Code")?.value

    var body = new WriteMenuItem("1",RefId,Name,Price,Description,"",true,Code,false,[],[])
    return body
  }
}