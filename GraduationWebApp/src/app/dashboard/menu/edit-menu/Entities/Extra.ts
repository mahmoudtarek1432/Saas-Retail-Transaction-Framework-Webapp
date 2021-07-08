import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuItemExtra, WriteMenuItemExtra } from "src/app/shared/Dto/MenuItemExtra";

export class ExtrasForm{

    constructor(private formBuilder: FormBuilder){

    }

    static MenuItemExtrasFormGroup(formBuilder: FormBuilder, Extra: MenuItemExtra):FormGroup{
        return formBuilder.group({
          Name: [Extra.name,[Validators.required, Validators.minLength(3)]],
    
          Price: [Extra.price,[Validators.required, Validators.pattern(/^[.\d]+$/)]],
    
          Code: [Extra.code,[Validators.required, Validators.maxLength(4)]]
        })
      }

    static MenuItemExrasValidationMessages(){
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

  static MenuItemExrasErrors(){
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

    var body = new WriteMenuItemExtra("1",Name,Price,RefId,"",true,Code);
    return body
  }
}