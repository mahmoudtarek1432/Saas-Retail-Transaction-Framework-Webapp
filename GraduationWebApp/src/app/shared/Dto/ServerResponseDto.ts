import { ThrowStmt } from "@angular/compiler"
import { Type } from '@angular/core';

export class ServerResponseDto<T>{
    isSuccessfull : boolean = false;
    message :string = ""
    errors :  string[] =[]
    responseObject!: T 
}

export class ServerResponse{
    isSuccessfull : boolean = false;
    message :string = ""
    errors :  string[] =[]

}