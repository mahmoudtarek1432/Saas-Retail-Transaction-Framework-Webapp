import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "Home", component: HomeComponent},
  {path: "Login", component: LoginComponent},
  {path: "Register", component: RegisterComponent},
  {path: "Dashboard", component: DashboardComponent,
    children:[
    {path: "Main", component: DashboardMainComponent},
    {path: "Settings", component: SettingsComponent},
    {path: "Orders", component: OrdersComponent},
    {path: "Menu", component: MenuComponent},
    {path: "**", component: DashboardMainComponent}
    ] },
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
