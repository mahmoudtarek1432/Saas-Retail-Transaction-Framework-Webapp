import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponseDto } from 'src/app/shared/Dto/ServerResponseDto';
import { Settings } from 'src/app/shared/Dto/Settings';
import { Globals } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient, private globals:Globals) { }

  getUserSettings():Observable<ServerResponseDto<Settings>>{
    return this.http.get<ServerResponseDto<Settings>>(this.globals.baseUrl+"/TerminalSettingsConfiguration",{withCredentials : false})
  }

  PostUserSettings(body: Settings):Observable<ServerResponseDto<Settings>>{
    return this.http.post<ServerResponseDto<Settings>>(this.globals.baseUrl+"/TerminalSettingsConfiguration", body ,{withCredentials : false})
  }

  UpdateUserSettings(body: Settings):Observable<ServerResponseDto<Settings>>{
    return this.http.patch<ServerResponseDto<Settings>>(this.globals.baseUrl+"/TerminalSettingsConfiguration", body ,{withCredentials : false})
  }
}
