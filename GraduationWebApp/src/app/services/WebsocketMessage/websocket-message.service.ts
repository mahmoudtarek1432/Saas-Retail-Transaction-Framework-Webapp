import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerResponse } from 'src/app/shared/Dto/ServerResponseDto';
import { WebsocketResponse } from 'src/app/shared/Dto/WebSocketResponse';
import { Globals } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class WebsocketMessageService {

  constructor(private http: HttpClient, private globlas: Globals) { }
  Message =  new BehaviorSubject<WebsocketResponse>(new WebsocketResponse());

  WebSocketMessageObserver = this.Message.asObservable();

  nextMessage(Message: WebsocketResponse){
    this.Message.next(Message);
  }

  ConnectToWebSocket(Connid: string):Observable<ServerResponse>{
    return this.http.post<ServerResponse>(this.globlas.baseUrl+"/WebSocket/WebApp/"+Connid, {withCredentials: false})
  }
}
