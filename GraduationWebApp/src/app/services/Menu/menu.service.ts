import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, WriteCategory } from 'src/app/shared/Dto/Category';
import { Menu } from 'src/app/shared/Dto/Menu';
import { MenuItem, WriteMenuItem } from 'src/app/shared/Dto/MenuItem';
import { MenuItemExtra, WriteMenuItemExtra } from 'src/app/shared/Dto/MenuItemExtra';
import { MenuItemOptions, WriteMenuItemOptions } from 'src/app/shared/Dto/MenuItemOptions';
import { ServerResponseDto,ServerResponse } from 'src/app/shared/Dto/ServerResponseDto';
import { Globals } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getMenu():Observable<ServerResponseDto<Menu>>{
    return this.http.get<ServerResponseDto<Menu>>(this.globals.baseUrl+"/TerminalMenuConfiguration", {withCredentials: false})
  }

  PostCreateCategory(body:WriteCategory):Observable<ServerResponseDto<Category>>{
    return this.http.post<ServerResponseDto<Category>>(this.globals.baseUrl+"/TerminalMenuConfiguration/Category",body, {withCredentials: false})
  }

  PostCreateMenuItem(body:WriteMenuItem):Observable<ServerResponseDto<MenuItem>>{
    return this.http.post<ServerResponseDto<MenuItem>>(this.globals.baseUrl+"/TerminalMenuConfiguration/MenuItem",body, {withCredentials: false})
  } 

  PostCreateMenuItemExtra(body:WriteMenuItemExtra):Observable<ServerResponseDto<MenuItemExtra>>{
    return this.http.post<ServerResponseDto<MenuItemExtra>>(this.globals.baseUrl+"/TerminalMenuConfiguration/MenuItemExtras",body, {withCredentials: false})
  }

  PostCreateMenuItemOption(body:WriteMenuItemOptions):Observable<ServerResponseDto<MenuItemOptions>>{
    return this.http.post<ServerResponseDto<MenuItemOptions>>(this.globals.baseUrl+"/TerminalMenuConfiguration/MenuItemOption",body, {withCredentials: false})
  }

  ///dsasdasda
  DeleteElement(Id:string,elementType:number):Observable<ServerResponse>{
    return this.http.delete<ServerResponse>(this.globals.baseUrl+"/TerminalMenuConfiguration/"+Id+"/"+elementType, {withCredentials: false})
  }
  PatchUpdateCategory(body:WriteCategory):Observable<ServerResponseDto<Category>>{
    return this.http.patch<ServerResponseDto<Category>>(this.globals.baseUrl+"/TerminalMenuConfiguration/Update/Category",body, {withCredentials: false})
  }

  PatchUpdateMenuItem(body:WriteMenuItem):Observable<ServerResponseDto<MenuItem>>{
    return this.http.patch<ServerResponseDto<MenuItem>>(this.globals.baseUrl+"/TerminalMenuConfiguration/Update/MenuItem",body, {withCredentials: false})
  } 

  PatchUpdateMenuItemExtra(body:WriteMenuItemExtra):Observable<ServerResponseDto<MenuItemExtra>>{
    return this.http.patch<ServerResponseDto<MenuItemExtra>>(this.globals.baseUrl+"/TerminalMenuConfiguration/Update/MenuItemExtras",body, {withCredentials: false})
  }

  PatchUpdateMenuItemOption(body:WriteMenuItemOptions):Observable<ServerResponseDto<MenuItemOptions>>{
    return this.http.patch<ServerResponseDto<MenuItemOptions>>(this.globals.baseUrl+"/TerminalMenuConfiguration/Update/MenuItemOption",body, {withCredentials: false})
  }
}
