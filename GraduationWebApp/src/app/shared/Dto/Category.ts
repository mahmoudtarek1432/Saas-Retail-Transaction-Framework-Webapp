import { MenuItem } from "./MenuItem"

export class Category{
    id : string

    menuId : string

    name : string

    display : boolean

    items : MenuItem[]

    constructor(id: string, menuId: string, name: string,display: boolean, items: MenuItem[]){
        this.id = id;
        this.menuId = menuId;
        this.name = name;
        this.display = display;
        this.items = items
    }
}

export class WriteCategory{

    id: string

    menuId : string

    name : string

    display : boolean

    constructor(id: string, menuId: string, name: string,display: boolean, items: MenuItem[]){
        this.id = id
        this.menuId = menuId;
        this.name = name;
        this.display = display;
    }
}