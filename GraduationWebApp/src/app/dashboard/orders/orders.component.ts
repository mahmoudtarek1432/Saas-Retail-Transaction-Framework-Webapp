import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/Order/order.service';
import { WebsocketMessageService } from 'src/app/services/WebsocketMessage/websocket-message.service';
import { Order } from 'src/app/shared/Dto/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = []

  

  constructor(private OrderService: OrderService, private websocketMessge: WebsocketMessageService) { 
    
    OrderService.getOrderUpdates().subscribe(result => {
      this.orders = result.responseObject.reverse()
      this.orders[0].orderStatus[this.orders[0].orderStatus.length-1].state
      console.log(new Date(Date.parse(this.orders[0].date)).toLocaleDateString())
      this.updateOrders();



      this.newOrderPlacedListner()
    })

  }

  ngOnInit(): void {
  }

  toggelItem(event:any){
    var orderRow = event.target.parentElement.parentElement.parentElement.parentElement //order row class
    if(orderRow.getAttribute('toggled') == 'false'){
      orderRow.style.height = '378px';
      orderRow.style.overflowY = 'scroll';
      orderRow.setAttribute('toggled','true')
    }
    else 
    if(orderRow.getAttribute('toggled') == 'true'){
      orderRow.style.height = '100px';
      orderRow.style.overflowY = 'hidden';
      orderRow.setAttribute('toggled','false')
    }
  }

  updateState(orderId:string, orderState:number){
    this.OrderService.patchUpdateState(orderId, orderState).subscribe(result => {
      if(result.isSuccessfull){
        this.updateOrders()
      }
    },(err: HttpErrorResponse) =>{
      alert(err.message)
    })
  }

  newOrderPlacedListner(){
    this.websocketMessge.WebSocketMessageObserver.subscribe(result =>{
      console.log("test")
      if(result.type == 7 || result.type == 8){
        this.updateOrders()
      }
    })
  }

  updateOrders(){
    this.OrderService.getOrderUpdates().subscribe(result => {
      this.orders = result.responseObject.reverse()
      this.orders[0].orderStatus[this.orders[0].orderStatus.length-1].state
      console.log(new Date(Date.parse(this.orders[0].date)).toLocaleDateString());
      this.orders.forEach( order => { 
        order.price = 0;
        order.orderCode = ''
        if(order.orderItem != undefined){
          order.orderItem!.forEach (Item => {
            order.price += Item.price;
            order.orderCode = order.orderCode + Item.itemCode
            console.log( Item.orderExtras)
            if(Item.orderExtras != undefined){
              Item.orderExtras!.forEach(ItemExtra => {
                order.price += ItemExtra.price
                order.orderCode = order.orderCode + '-'+ ItemExtra.code
                console.log(ItemExtra.code)
              })
            }
            order.orderCode = order.orderCode + " "
            })
          }
        })


      console.log(this.orders)
    })
  }
}
