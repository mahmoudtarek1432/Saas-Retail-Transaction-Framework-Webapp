import { MenuItemExtra } from "./MenuItemExtra"
import { MenuItemOptions } from "./MenuItemOptions"

export class MenuItem{
    id : string

    categoryId : string

    name : string

    price : number

    description : string

    image : string

    display : boolean

    code : string

    hasOptions : boolean

    itemExtras : MenuItemExtra[]

    itemOptions :MenuItemOptions[]

    constructor(id: string,  categoryId : string, name : string, price : number ,description : string
        ,image : string, display : boolean, code : string, hasOptions : boolean, ItemExtras: MenuItemExtra []
        ,ItemOptions: MenuItemOptions[]){
            this.id = id;
            this.categoryId = categoryId;
            this.name = name;
            this.price = price;
            this.image = image;
            this.itemExtras = ItemExtras;
            this.itemOptions = ItemOptions;
            this.display = display;
            this.code = code;
            this.hasOptions = hasOptions
            this.description = description;
        }

    
}

export class WriteMenuItem{

    id: string 
    
    categoryId : string

    name : string

    price : number

    description : string

    image : string

    display : boolean

    code : string

    hasOptions : boolean

    constructor(id: string,  categoryId : string, name : string, price : number ,description : string
        ,image : string, display : boolean, code : string, hasOptions : boolean, ItemExtras: MenuItemExtra []
        ,ItemOptions: MenuItemOptions[]){
            this.id = id;
            this.categoryId = categoryId;
            this.name = name;
            this.price = price;
            this.image = image;
            this.display = display;
            this.code = code;
            this.hasOptions = hasOptions
            this.description = description;
    }
}