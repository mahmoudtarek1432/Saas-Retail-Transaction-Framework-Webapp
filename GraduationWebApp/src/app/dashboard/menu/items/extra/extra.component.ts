import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/Menu/menu.service';
import { MenuItemExtra } from 'src/app/shared/Dto/MenuItemExtra';
import { MenuItemOptions } from 'src/app/shared/Dto/MenuItemOptions';
import { Globals } from 'src/app/shared/global';
import { AddMenuComponent } from '../../add-menu/add-menu.component';
import { EditMenuComponent } from '../../edit-menu/edit-menu.component';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent implements OnInit {
  @Input() ItemExtras!:MenuItemExtra[]
  @Input() ItemId!: string;
  @Input() MenuDelegate!: ()=> void;
  constructor(private Dialog: MatDialog,  public globals:Globals, private MenuService:MenuService) { }

  ngOnInit(): void {
  }

  openExtraDialog(){
    var dialogRef = this.Dialog.open(AddMenuComponent,{
      data: {ref: this.ItemId, type: 4}
    })
    dialogRef.afterClosed().subscribe(res => {
      this.ItemExtras.push(res.data)
    })
  }

  deleteElement(ElementId:string,elementType:number, Array:Array<any>){
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

  EditElement(ItemExtra:MenuItemExtra){
    this.Dialog.open(EditMenuComponent,{
      data:{ref: ItemExtra.itemId,type:4, ElementData: ItemExtra} //type 4 is for item extra
    
    }).afterClosed().subscribe(() => this.MenuDelegate())
  }
}
