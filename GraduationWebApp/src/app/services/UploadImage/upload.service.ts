import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponseDto } from 'src/app/shared/Dto/ServerResponseDto';
import { Globals } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient, private globals:Globals) { }

  uploadImage(file:FormData):Observable<ServerResponseDto<string>>{
    return this.http.post<ServerResponseDto<string>>(this.globals.baseUrl+"/Upload",file,{withCredentials: false});
  }
}
