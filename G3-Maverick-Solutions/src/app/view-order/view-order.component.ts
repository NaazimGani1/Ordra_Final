import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CustomerOrderService} from '../customer-order-management/customer-order.service';
import {CustomerOrder} from '../customer-order-management/customer-order';
import {OrderDetails} from '../customer-order-management/order-details';
import {ProductDetails} from '../customer-order-management/product-details';
import {Customer} from '../customer-management/customer';
import{SearchedOrder} from '../customer-order-management/searched-order';
import {ProductOrderLine} from '../customer-order-management/product-order-line';
import{map} from 'rxjs/operators';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  constructor(private api: CustomerOrderService,private router: Router) { }

  dateVal = new Date();
  cell:string;
  orderNo: string;


  customer: Customer = new Customer();
  orderDetails: CustomerOrder = new CustomerOrder();
  calculatedValues: OrderDetails = new OrderDetails();
  orderProducts: ProductDetails[] = [];
  responseMessage: string = "Request Not Submitted";

  showTable: boolean = false;
  showList: boolean = false;
  selectOrderNo: boolean = false;
  selectCell: boolean = false;
  showOrder: boolean =false;
  showcriteria:boolean = true;
  showCell: boolean = false;
  showOrdNo: boolean = false;
  showOptions: boolean = false;

  selectedOrder: SearchedOrder = new SearchedOrder();
  searchedOrders: SearchedOrder[] = [];
 

  ngOnInit(): void {
  }

  selectedOrderNo(){
    this.selectOrderNo = true;
    this.showcriteria = false;
    this.showOrdNo = true;
    this.showOptions = true;
    
  }

  selectedCell(){
    this.selectCell = true;
    this.showcriteria = false;
    this.showCell = true;
    this.showOptions = true;
  }

  search(){
    if (this.selectCell == true){
      this.selectCell;
      this.searchByCell();
    }
    

    if(this.selectOrderNo == true){
      this.selectOrderNo;
      this.searchByOrderNo();
      
    }
  }

  view(val: any){
    this.orderNo = val;
    this.searchByOrderNo();
  }

  searchByOrderNo(){
    this.api.searchByOrderNo(this.orderNo).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message != null){
      this.responseMessage = res.Message;
      alert(this.responseMessage)}
      else{
        this.customer = res.customerDetails;
        this.calculatedValues = res.calculatedValues;
        this.orderProducts = res.orderProducts;
        this.orderDetails.CusOrdDate = res.orderDetails.OrderDate;
        this.orderDetails.CusOrdNumber =res.orderDetails.OrderNo;
        this.orderDetails.CustomerOrderID = res.CustomerOrderID;
       
        }
 
      
      })

      
      this.showOrder = true;
    }

    searchByCell(){
  
      this.api.searchByCell(this.cell).subscribe( (res:any)=> {
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

      selectOrder(val : SearchedOrder){
          this.selectedOrder = val;
          this.orderNo = this.selectedOrder.CusOrdNumber;
      }
    
    cancelOrder(){

        this.api.cancelOrder(this.selectedOrder.CustomerOrderID).subscribe( (res:any)=> {
          console.log(res);
          if(res.Message != null){
          this.responseMessage = res.Message;
          alert(this.responseMessage)}
      })
    }

    collectOrder(){

      this.api.collectOrder(this.selectedOrder.CustomerOrderID).subscribe( (res:any)=> {
        console.log(res);
        if(res.Message != null){
        this.responseMessage = res.Message;
        alert(this.responseMessage)}
    })
  }
    
  gotoCustomerOrderManagement()
  {
    this.router.navigate(["customer-order-management"])
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

}
