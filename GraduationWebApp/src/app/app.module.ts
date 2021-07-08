import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackgroundComponent } from './shared/background/background.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from './services/Account/account.service';
import { Globals } from './shared/global';
import { CookieService } from 'ngx-cookie-service'
import { AuthInterceptor } from './services/Account/interceptors/Auth.interceptor';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsComponent } from './dashboard/menu/items/items.component';
import { OptionComponent } from './dashboard/menu/items/option/option.component';
import { ExtraComponent } from './dashboard/menu/items/extra/extra.component';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { AddPosComponent } from './dashboard/dashboard-main/add-pos/add-pos.component';
import { POSService } from './services/POS/pos.service';
import { AddMenuComponent } from './dashboard/menu/add-menu/add-menu.component';
import { UploadService } from './services/UploadImage/upload.service';
import { EditMenuComponent } from './dashboard/menu/edit-menu/edit-menu.component';
import { SettingsService } from './services/settings/settings.service';
import { WebsocketMessageService } from './services/WebsocketMessage/websocket-message.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BackgroundComponent,
    RegisterComponent,
    LoginComponent,
    SettingsComponent,
    OrdersComponent,
    MenuComponent,
    ItemsComponent,
    OptionComponent,
    ExtraComponent,
    DashboardMainComponent,
    AddPosComponent,
    AddMenuComponent,
    EditMenuComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  providers: [
    AccountService,
    Globals,
    CookieService,
    POSService,
    UploadService,
    SettingsService,
    WebsocketMessageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    },
    {
      provide:MatDialogRef,
      useValue: {}
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
