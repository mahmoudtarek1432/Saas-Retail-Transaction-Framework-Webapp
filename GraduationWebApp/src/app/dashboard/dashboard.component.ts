import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings/settings.service';
import { Settings } from '../shared/Dto/Settings';
import { Globals } from '../shared/global';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Setting!: Settings;
  constructor(private router:Router,public settings: SettingsService,public globals:Globals) {
    globals.updateLoaderToggled(true)
    settings.getUserSettings().subscribe(result => {
      if(result.isSuccessfull == true){
        this.Setting = result.responseObject
      }
      globals.updateLoaderToggled(false)
    },(err:HttpErrorResponse) =>{
      alert(err.message)
      globals.updateLoaderToggled(false)
    } )
   }

  ngOnInit(): void {
  }

  LogOut(){
    localStorage.removeItem('ApiAccessToken')
    this.router.navigateByUrl("Home");
  }
}
