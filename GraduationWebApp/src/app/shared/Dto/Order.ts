export class Order{

    id : string = ''

    posSerial : string = ''

    terminalSerial : string = ''

    table : number = 0

    date : string = ''

    additionalInfo : string = ''

    orderStatus : OrderState[] = []

    orderComment : OrderComment[] = []

    orderItem : OrderItem[] = []

    price: number =  0

    orderCode:string = ''
}

export class OrderItem{

    itemId :string = ''

    itemCode : string = ''

    /*Menu Item params*/

    name : string = ''

    price : number = 0

    description : string = ''

    image : string = ''

    quantity : number = 0

    orderExtras : OrderItemExtra[] = []
}

class OrderComment{

}

class OrderState{
    id : number = 0

    orderId = ''

    state :number = 0

    date = ''
}

class OrderItemExtra{

    orderExtraId : string = ''

    itemExtraId : string = ''

    name : string = ''

    price :number = 0

    image : string = ''

    display : boolean = false

    code : string = ''
}

