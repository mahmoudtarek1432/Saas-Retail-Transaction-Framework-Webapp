import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/Menu/menu.service';
import { MenuItem } from 'src/app/shared/Dto/MenuItem';
import { Globals } from 'src/app/shared/global';
import { EditMenuComponent } from '../edit-menu/edit-menu.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Input() Item!:MenuItem
  @Input() MenuDelegate!:()=>void;
  constructor(public globals:Globals, private MenuService:MenuService, private dialog:MatDialog) {
    console.log()
    globals.baseUrl
   }

  ngOnInit(): void {
  }

  deleteElement(ElementId:string,elementType:number){
    this.globals.updateLoaderToggled(true)
    this.MenuService.DeleteElement(ElementId,elementType).subscribe(result => {
      if(result.isSuccessfull){
        this.MenuDelegate()
        this.globals.updateLoaderToggled(false)
      }
      else{
        alert(result.message)
        this.globals.updateLoaderToggled(false)
      }
    },(err)=> {
      alert(err)
      this.globals.updateLoaderToggled(false)
    })
  }

  EditElement(){
    this.dialog.open(EditMenuComponent,{
      data:{ref: this.Item.categoryId,type:2,ElementData: this.Item}
    
    }).afterClosed().subscribe(() => this.MenuDelegate())
  }
}
