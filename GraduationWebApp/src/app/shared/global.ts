import { HttpHeaders } from "@angular/common/http"
import { Settings } from "http2"
import { BehaviorSubject } from "rxjs"

export class Globals{
    baseUrl = "http://192.168.43.118:84/api"
    WebSocketUrl = "ws://192.168.43.118:84/"
    baseUrlImage = 'http://192.168.43.118:84/'
    settings!: Settings;

    headers:HttpHeaders = new HttpHeaders({
        'Access-Control-Allow-Credentials': '*',
        'Access-Control-Allow-Origin': '*',
        
      })

    loaderToggled = new BehaviorSubject<boolean>(false);
    castLoaderToggled = this.loaderToggled.asObservable();

    updateLoaderToggled(value:boolean){
        this.loaderToggled.next(value)
    }

}