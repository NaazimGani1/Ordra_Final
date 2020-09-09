import { Component, OnInit } from '@angular/core';
import{SearchedOrder} from '../customer-order-management/searched-order';
import { Router } from '@angular/router';
import {CustomerOrderService} from '../customer-order-management/customer-order.service';


@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {

  constructor(private api: CustomerOrderService,private router: Router) { }

  responseMessage: string = "Request Not Submitted";
  selectedOrders: string[] = [];
  searchedOrders: SearchedOrder[] = [];
  status: string = "fulfilled";
  showList:boolean= false;

  ngOnInit(): void {
  }

  searchByCell(){
  
    this.api.getOrdersByStatus(this.status).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message != null){
      this.responseMessage = res.Message;
      alert(this.responseMessage)}
      else{

            this.searchedOrders = res;
        }
  
      
      })
      this.showList = true;
    }

    select(selection: string){
      this.selectedOrders.push(selection);

    }

    getOrders(){
      
    }
}
