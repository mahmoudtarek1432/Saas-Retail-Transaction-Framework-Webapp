import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MenuService } from "src/app/services/Menu/menu.service";
import { UploadService } from "src/app/services/UploadImage/upload.service";
import { WriteCategory } from "src/app/shared/Dto/Category";
import { AddMenuComponent } from "../add-menu.component";

export class CategoryForm{

    constructor(private formBuilder: FormBuilder){

    }

    static categoryFormGroup(formBuilder: FormBuilder):FormGroup{
        return formBuilder.group({
          Name: ["",[Validators.required, Validators.minLength(3)]],
        })
      }

    static CategoryValidationMessages(){
    var validationMessege = {
        "Name":  {
        "required": "This field is Required",
        "minlength": "The Minimum length for this field is 3 Characters",
        },
    }
    return validationMessege
    }

    static CategoryErrors(){
        var validationMessege = {
          "Name":  ""
        }
        return validationMessege
      }

    static HttpRequestBody(inputForm:FormGroup,RefId:string):any{
      
      var Name = inputForm.get("Name")?.value

      var body = new WriteCategory("1",RefId,Name,true,[])
      return body
    }
}