import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterAccount } from 'src/app/shared/Dto/RegisterAccount';
import { Globals } from 'src/app/shared/global';
import { ServerResponse, ServerResponseDto } from 'src/app/shared/Dto/ServerResponseDto';
import { LoginAccount } from 'src/app/shared/Dto/LoginAccount';
import { analyzeFileForInjectables } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public globals:Globals, public http:HttpClient) { }

  RegisterAccount(Register:RegisterAccount):Observable<ServerResponseDto<string>>{
    return this.http.post<ServerResponseDto<string>>(this.globals.baseUrl+"/WebApp/Register",Register,{headers: this.globals.headers})
  }

  Login(login:LoginAccount):Observable<ServerResponseDto<string>>{
    return this.http.post<ServerResponseDto<string>>(this.globals.baseUrl+"/WebApp/login",login,{headers: this.globals.headers,withCredentials: false})
  }

  CheckAuth():Observable<ServerResponse>{
    return this.http.get<ServerResponse>(this.globals.baseUrl+"/WebApp/CheckAuth",{headers: this.globals.headers,withCredentials: false})
  }

  ChangePassword(oldPassword:string,newPassword:string):Observable<ServerResponseDto<string>>{
    var body ={
      'oldPassword': oldPassword,
      'newPassword': newPassword
    }
    return this.http.post<ServerResponseDto<string>>(this.globals.baseUrl+"/WebApp/ChangePassword",body,{headers: this.globals.headers,withCredentials: false})
  }


}
