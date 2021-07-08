import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/Menu/menu.service';
import { Category } from 'src/app/shared/Dto/Category';
import { Menu } from 'src/app/shared/Dto/Menu';
import { Globals } from 'src/app/shared/global';
import { AddMenuComponent } from './add-menu/add-menu.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: Menu = new Menu("sd",[]);
  GetMenuDelegate = this.getMenu.bind(this)
  test:any
  constructor(private MenuService:MenuService, private dialog: MatDialog, private globals: Globals) {
    globals.updateLoaderToggled(true)
    this.getMenu()
   }

  ngOnInit(): void {
  }

  openCategoryDialog(Menu: Menu){
    var dialogRef = this.dialog.open(AddMenuComponent, {
      data: {ref: Menu.id,type:1}
    })
    dialogRef.afterClosed().subscribe(res => {
      this.menu.categories.push(res.data)
    })
  }

  openItemDialog(cat: Category){
    var dialogRef = this.dialog.open(AddMenuComponent, {
      data: {ref: cat.id,type:2}
    })
    dialogRef.afterClosed().subscribe(res => {
      cat.items.push(res.data)
    })
  }

  deleteElement(ElementId:string,elementType:number, Array:Array<any>){
    this.globals.updateLoaderToggled(true)
    this.MenuService.DeleteElement(ElementId,elementType).subscribe(result => {
      if(result.isSuccessfull){
        this.getMenu
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

  getMenu(){
    this.MenuService.getMenu().subscribe(result => {
      if(result.isSuccessfull){
        this.menu = result.responseObject;
        this.globals.updateLoaderToggled(false)
      } 
    },(error)=>{
      this.globals.updateLoaderToggled(false)
      alert(error)
    })
  }
}
