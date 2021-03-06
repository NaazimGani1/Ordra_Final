import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CustomerOrderService} from '../customer-order-management/customer-order.service';
import {CustomerOrder} from '../customer-order-management/customer-order';
import {OrderDetails} from '../customer-order-management/order-details';
import {ProductDetails} from '../customer-order-management/product-details';
import {Customer} from '../customer-management/customer';
import {ProductOrderLine} from '../customer-order-management/product-order-line';
import{map} from 'rxjs/operators';






@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  constructor(private api: CustomerOrderService, private router: Router) { }

  customerID:number = 2;
  userID: number = 1; //Should be changed;
  subtotal:number = 0;
  total: number = 0;
  quantity: number = 0;
  vatPerc: number = 0;
  responseMessage: string = "Request Not Submitted";
  showButton = false;
  showProd = false;
  showCus = true;

  showTable: boolean = false;
  name : string;
  surname : string;

  displayTotal:string ="0";
  displaySubtotal:string="0";
  displayVat: string= "0";

  TotalIncVat: number;
  TotalExcVat: number;
  Vat: number;
 
  dateVal = new Date();
  customer: Customer = new Customer();

  catSelection: number;
  prodSelection : number = 0;

  prodNotSelected: boolean = false;
  quantyNull: boolean = false;
  customerNull: boolean = false;

  
  customerOrder: CustomerOrder = new CustomerOrder();
  orderDetails: OrderDetails = new OrderDetails();
  productDetails: ProductDetails = new ProductDetails();
  prodOrder: ProductOrderLine = new ProductOrderLine();

  prodOrderLine : ProductOrderLine[] = [];
  productsWithPrice: ProductDetails[] = [];
  prodsForCategory: ProductDetails[] = [];
  orderProducts: ProductDetails[] = [];
 
  

CustomerID: number;

 ngOnInit()
  {
    
    //this.api.currentCustomerID().subscribe(custID => this.CustomerID = custID);
    
  
  }



  getCustomer()
  {
    if( this.name == null || this.surname==null){
      this.customerNull = true;
    }
    else{
      this.customerNull = false;
    this.api.searchCustomer(this.name,this.surname).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message != null){
      this.responseMessage = res.Message;
      alert(this.responseMessage)}
      else{
          this.customer.CustomerID = res.CustomerID;
          this.customer.CusName = res.CusName;
          this.customer.CusSurname = res.CusSurname;
          this.customer.CusCell = res.CusCell;
          this.customer.CusEmail = res.CusEmail;
          this.customerID = res.CustomerID;

          this.CustomerID = res.CustomerID;

          this.initiatePlaceOrder(res.CustomerID)
      }
          

      
    })}

   

  }

  initiatePlaceOrder(ID: any){
   // this.CustomerID = parseInt(this.api.currentCustomerID.toString());

     this.api.initiatePlaceOrder(ID).subscribe( (res:any)=> {
              console.log(res);
              if(res.Message != null){
                this.responseMessage = res.Message;
                alert(this.responseMessage)}
                else{
                //set customer details
                this.customer = res.customer;

                //set customer order details
                this.customerOrder.CustomerID = res.customer.CustomerID;
                this.customerOrder.UserID = this.userID;
                this.customerOrder.CusOrdDate = res.orderInfo.OrderDate;
                this.customerOrder.CusOrdNumber = res.orderInfo.OrderNo;

                //get vat percentage
                this.vatPerc = res.orderInfo.VatPerc.VATPerc;

                //set List of product with prices
                this.productsWithPrice = res.products.sort((a,b) => b-a);

           
              }
                
              });

              this.orderDetails.TotalExcVat = 0;
              this.orderDetails.TotalIncVat = 0;

              this.showProd = true;
              this.showCus = false;
  }


  addProduct(val: ProductDetails){
    if(val == null){
      this.prodNotSelected= true
    }
    this.prodPush(val);
  }

  prodPush(val: ProductDetails){
    this.productDetails = val;
    }

listProducts(){
  if(this.prodSelection == 0){
    this.prodNotSelected= true
   }
  else if(this.quantity == 0){
  
    this.quantyNull = true;
  }
  else{
    this.quantyNull = false;

  this.productDetails.Quantity = this.quantity;
  this.productDetails.Subtotal = (this.quantity * this.productDetails.Price)
  this.orderProducts.push(this.productDetails);

  this.prodOrder.PLQuantity = this.quantity;
  this.prodOrder.ProductID = this.productDetails.ProductID;

  this.customerOrder.Product_Order_Line.push(this.prodOrder);

  this.total = this.total + this.productDetails.Subtotal;

  this.TotalIncVat = this.total;
  this.Vat = ((this.vatPerc/(this.vatPerc + 100)) * this.TotalIncVat);
  this.TotalExcVat = this.total - this.Vat;
 

  this.orderDetails.TotalIncVat = this.TotalIncVat;
  this.orderDetails.Vat  = this.Vat;
  this.orderDetails.TotalExcVat = this.TotalExcVat;

 this.displayTotal = this.TotalIncVat.toFixed(2);
 this.displayVat = this.Vat.toFixed(2);
 this.displaySubtotal = this.TotalExcVat.toFixed(2);


  

this.showTable = true;}

}

remove(index: any){
  this.total = this.total - this.productDetails.Subtotal;
  this.TotalIncVat = this.total;
  this.Vat = ((this.vatPerc/(this.vatPerc + 100)) * this.TotalIncVat);
  this.TotalExcVat = this.total - this.Vat;
 
  this.orderDetails.TotalIncVat = this.TotalIncVat;
  this.orderDetails.Vat  = this.Vat;
  this.orderDetails.TotalExcVat = this.TotalExcVat;

  this.orderProducts.splice(index,1);
  this.customerOrder.Product_Order_Line.splice(index,1);

  this.displayTotal = this.TotalIncVat.toFixed(2);
 this.displayVat = this.Vat.toFixed(2);
 this.displaySubtotal = this.TotalExcVat.toFixed(2);
}


  placeOrder()
  {
    //this.customerOrder.Product_Order_Line = this.prodOrderLine;
    
     this.api.placeOrder(this.customerOrder).subscribe( (res:any)=> {
       console.log(res);
       if(res.Message){
       this.responseMessage = res.Message;}
       alert(this.responseMessage)
       this.router.navigate(["customer-order-management"])
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

