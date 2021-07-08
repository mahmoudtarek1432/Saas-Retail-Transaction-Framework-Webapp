import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor (public cookieService: CookieService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token =  localStorage.getItem('ApiAccessToken');
        console.log(token)
        if(token){
            var clone = req.clone({headers: req.headers.set("Authorization","bearer "+token)});
            
            return next.handle(clone);
        }else{
            return next.handle(req)
        }
    }
 
}