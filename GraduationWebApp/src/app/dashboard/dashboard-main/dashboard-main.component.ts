import { Component, OnInit } from '@angular/core';
import { pos } from 'src/app/shared/Dto/pos';
import { terminal } from 'src/app/shared/Dto/Terminal';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { browser } from 'protractor';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPosComponent } from './add-pos/add-pos.component';
import { POSService } from 'src/app/services/POS/pos.service';
import { Globals } from 'src/app/shared/global';
import { HttpErrorResponse } from '@angular/common/http';
import { TerminalService } from 'src/app/services/Terminal/terminal.service';


@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  POSes: pos[] = []

  constructor(public dialog:MatDialog, public posService:POSService, public globals:Globals, private terminalService:TerminalService) {
    this.globals.updateLoaderToggled(true);
    posService.getAllPOSs().subscribe(result =>{
      if(result.isSuccessfull){
        this.POSes = result.responseObject
      }
      else{
        alert(result.message)
      }
      this.globals.updateLoaderToggled(false);
    },(err:HttpErrorResponse) => {
      console.log("sda")
      this.globals.updateLoaderToggled(false);
    })
   }

  ngOnInit(): void {
   this.POSes = [new pos(1,"tagamo3","asd0-asd12-1341-sdad",1,"online")]
   this.POSes[0].terminals = [new terminal(1,"sad1-5-fdg-5fdgdfg5-dfg",2,4,"asd0-asd12-1341-sdad","Offline")]
  }

  AddPOSDialog(){
    var dialogRef = this.dialog.open(AddPosComponent)

    dialogRef.afterClosed().subscribe(result => {
      this.globals.updateLoaderToggled(true);
      this.posService.getAllPOSs().subscribe(
        (response)=>{
        if(response.isSuccessfull){
          this.POSes = response.responseObject
          this.globals.updateLoaderToggled(false);
        }
      }
      ,(err:HttpErrorResponse)=>{
        this.globals.updateLoaderToggled(false);
        console.log(err)
      });
    })
  }

  AddTerminal(Pos:pos){
    this.globals.updateLoaderToggled(true);
    this.terminalService.postAddTerminal(Pos.serial).subscribe(result =>{
      if(result.isSuccessfull){

        this.terminalService.getPOSTerminals(Pos.serial).subscribe(
          (response)=>{
          if(response.isSuccessfull){
            this.POSes.forEach(P =>{
              if(P.serial == Pos.serial){
                P.terminals = response.responseObject;
              }
            }) 
            
          }
          this.globals.updateLoaderToggled(false);
        }
        ,(err:HttpErrorResponse)=>{
          this.globals.updateLoaderToggled(false);
          console.log(err)
        }); 
      }
      this.globals.updateLoaderToggled(false);
    },(err:HttpErrorResponse)=>{
      this.globals.updateLoaderToggled(false);
      console.log(err)
    }); 

  }

  deletePOS(POSSerial: string){
    this.globals.updateLoaderToggled(true);
    this.posService.deletePOS(POSSerial).subscribe(result =>{
      if(result.isSuccessfull){
        this.POSes = this.POSes.filter(e => e.serial != POSSerial)
        this.globals.updateLoaderToggled(true);
      }
      else{
        alert(result.message)
        this.globals.updateLoaderToggled(false);
      }
    },(err:HttpErrorResponse)=>{
      alert("Error has occured")
      this.globals.updateLoaderToggled(false);
    });
  }

  deleteTerminal(posSerial:string,TerminalSerial: string){
    this.globals.updateLoaderToggled(true);
    this.terminalService.deleteTerminal(TerminalSerial).subscribe(result =>{
      if(result.isSuccessfull){
        this.POSes.forEach(P => {
          if(P.serial == posSerial){
            P.terminals = P.terminals.filter(T => T.serial != TerminalSerial)
          }
        })
        this.globals.updateLoaderToggled(false);
      }
      else{
        alert(result.message)
        this.globals.updateLoaderToggled(false);
      }
    },(err:HttpErrorResponse)=>{
      alert("Error has occured")
      this.globals.updateLoaderToggled(false);
    });
  }
}
