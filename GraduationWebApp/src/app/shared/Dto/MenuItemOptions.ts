import { ThrowStmt } from "@angular/compiler";

export class MenuItemOptions{
    id : string;

    itemId : string

    name :string

    price : number

    display : boolean

    code : string

    constructor(id : string, itemId : string, name :string, price : number, display : boolean
        ,code : string){
            this.id = id;
            this.itemId = itemId;
            this.name = name;
            this.price = price;
            this.display = display;
            this.code = code;
        }
}

export class WriteMenuItemOptions{
    id : string;

    itemId : string

    name :string

    price : number

    display : boolean

    code : string

    constructor(id : string, itemId : string, name :string, price : number, display : boolean
        ,code : string){
            this.id = id;
            this.itemId = itemId;
            this.name = name;
            this.price = price;
            this.display = display;
            this.code = code;
        }
}