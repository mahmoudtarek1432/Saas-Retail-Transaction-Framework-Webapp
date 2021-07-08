import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pos } from 'src/app/shared/Dto/pos';
import { ServerResponseDto,ServerResponse } from 'src/app/shared/Dto/ServerResponseDto';
import { Globals } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class POSService {

  constructor(public http: HttpClient, public globals:Globals) { }

  postAddPOS(name: string):Observable<ServerResponse>{
    var body ={
      name: name,
      state: 1
    }
    return this.http.post<ServerResponse>(this.globals.baseUrl+"/POS/CreatePos",body,{withCredentials: false})
  }

  getAllPOSs():Observable<ServerResponseDto<pos[]>>{
    return this.http.get<ServerResponseDto<pos[]>>(this.globals.baseUrl+"/POS/AllPOSs",{withCredentials: false})
  }

  deletePOS(posSerial:string):Observable<ServerResponse>{
    return this.http.delete<ServerResponse>(this.globals.baseUrl+"/POS/"+posSerial,{withCredentials: false})
  }
}
