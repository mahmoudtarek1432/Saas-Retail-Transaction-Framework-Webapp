import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/Account/account.service';
import { SettingsService } from './services/settings/settings.service';
import { WebsocketMessageService } from './services/WebsocketMessage/websocket-message.service';
import { WebsocketResponse } from './shared/Dto/WebSocketResponse';
import { Globals } from './shared/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loaderToggled = false;

  title = 'GraduationWebApp';
  
  constructor(public globals:Globals, private websocketService:WebsocketMessageService, private authService: AccountService, private router:Router){
    globals.castLoaderToggled.subscribe(result => this.loaderToggled = result)
    

    var ws = new WebSocket(globals.WebSocketUrl)

    ws.onmessage = (ev)=>{
      console.log("here")
      if (ev.data.substring(0, 7) == "ConnID:"){ // connection id
        var connId:string = ev.data.substring(7, ev.data.length)
        websocketService.ConnectToWebSocket(connId).subscribe(result => "")
       
        
      }
      else{
        var message:WebsocketResponse = JSON.parse(ev.data)
        websocketService.nextMessage(message)
        
      }
    }

    this.onStart()
  }

  onStart(){
    
    if(localStorage.getItem("ApiAccessToken") != null){
      this.authService.CheckAuth().subscribe(result =>{
        if(result.isSuccessfull){
          this.router.navigateByUrl("Dashboard")
        }
        else{
          localStorage.removeItem("ApiAccessToken")
        }
      })
    }
    else{
     
      
    }
  }
}
