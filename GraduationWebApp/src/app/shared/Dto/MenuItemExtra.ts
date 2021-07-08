export class MenuItemExtra{
    id : string;

    name: string;

    price : number

    itemId : string

    image : string

    display :boolean

    code : string

    constructor(id: string, name: string, price: number, itemId: string,
        image: string, display: boolean, code:string){
            this.id = id;
            this.name = name;
            this.price = price;
            this.itemId = itemId;
            this.image = image;
            this.display = display;
            this.code = code
        }
}

export class WriteMenuItemExtra{

    id: string;

    name: string;

    price : number

    itemId : string

    image : string

    display :boolean

    code : string

    constructor(id: string, name: string, price: number, itemId: string,
        image: string, display: boolean, code:string){
            this.id = id;
            this.name = name;
            this.price = price;
            this.itemId = itemId;
            this.image = image;
            this.display = display;
            this.code = code
        }
}