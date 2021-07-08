import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pos } from 'src/app/shared/Dto/pos';
import { ServerResponseDto ,ServerResponse} from 'src/app/shared/Dto/ServerResponseDto';
import { terminal } from 'src/app/shared/Dto/Terminal';
import { Globals } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(public http: HttpClient, public globals:Globals) { }

  postAddTerminal(PosSerial: string):Observable<ServerResponse>{
    var body ={
      state: 1,
      table: 0,
      posSerial: PosSerial
    }
    return this.http.post<ServerResponse>(this.globals.baseUrl+"/Terminal/CreateTerminal",body,{withCredentials: false})
  }

  getPOSTerminals(PosSerial:string):Observable<ServerResponseDto<terminal[]>>{
    return this.http.get<ServerResponseDto<terminal[]>>(this.globals.baseUrl+"/Terminal/AllTerminals/"+PosSerial,{withCredentials: false})
  }

  deleteTerminal(TerminalSerial:string):Observable<ServerResponse>{
    return this.http.delete<ServerResponse>(this.globals.baseUrl+"/Terminal/"+TerminalSerial,{withCredentials: false})
  }
}
