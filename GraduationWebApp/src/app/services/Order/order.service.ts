import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/Dto/Order';
import { ServerResponse, ServerResponseDto } from 'src/app/shared/Dto/ServerResponseDto';
import { Globals } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private globals: Globals) { }

  getOrderUpdates():Observable<ServerResponseDto<Order[]>>{
    return this.http.get<ServerResponseDto<Order[]>>(this.globals.baseUrl+"/OrderView/Updates",{withCredentials: false})
  }

  patchUpdateState(orderId: string,state:number):Observable<ServerResponse>{
    return this.http.patch<ServerResponse>(this.globals.baseUrl+"/Orders/UpdateState/"+orderId+"/"+state,{withCredentials: false})
  }
}
