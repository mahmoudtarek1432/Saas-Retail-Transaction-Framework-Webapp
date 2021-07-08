import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/Menu/menu.service';
import { MenuItemOptions } from 'src/app/shared/Dto/MenuItemOptions';
import { Globals } from 'src/app/shared/global';
import { AddMenuComponent } from '../../add-menu/add-menu.component';
import { EditMenuComponent } from '../../edit-menu/edit-menu.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  @Input() ItemOptions!:MenuItemOptions[]
  @Input() ItemId!: string;
  @Input() MenuDelegate!: ()=> void;
  constructor(private Dialog: MatDialog, private globals:Globals, private MenuService:MenuService) {
    
   }

  ngOnInit(): void {
   
  }

  openOptionDialog(){
    var dialogRef = this.Dialog.open(AddMenuComponent,{
      data: {ref: this.ItemId, type: 3}
    })

    dialogRef.afterClosed().subscribe(res =>
      {
        this.ItemOptions.push(res.data)
        
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

  EditElement(ItemOption:MenuItemOptions){
    this.Dialog.open(EditMenuComponent,{
      data:{ref: ItemOption.itemId,type:3,ElementData: ItemOption} //type 3 is for item option
    
    }).afterClosed().subscribe(() => this.MenuDelegate())
  }
}
