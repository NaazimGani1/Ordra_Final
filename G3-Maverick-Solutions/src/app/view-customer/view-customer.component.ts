import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Customer} from '../customer-management/customer';
import { NgModule } from '@angular/core';
import {CustomerService} from '../customer-management/customer.service';
import {CustomerOrderService} from '../customer-order-management/customer-order.service';




@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})



export class ViewCustomerComponent implements OnInit {

  constructor(private api: CustomerService, private interaction: CustomerOrderService, private router: Router) { }
  customer : Customer = new Customer();
  responseMessage: string = "Request Not Submitted";

  showSave: boolean = false;
  showButtons: boolean = true;
  inputEnabled:boolean = true;
  showSearch: boolean = true;
  showResults: boolean = false;
  showTable: boolean = false;
  dateVal= new Date();

  name : string;
  surname : string;

  ngOnInit(): void {
    
  }

  searchCustomer(){
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
          this.customer.CusStreetNr = res.CusStreetNr;
          this.customer.CusStreet = res.CusStreet;
          this.customer.CusCode = res.CusCode;
          this.customer.CusSuburb = res.CusSuburb;
      }
      
      this.showSearch = false;
      this.showResults = true;
      
    })

  }

  updateCustomer(){
    this.api.updateCustomer(this.customer).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["customer-management"])
    })

  }

  deleteCustomer(){
    this.api.deleteCustomer(this.customer.CustomerID).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["customer-management"])
    })

  }



  enableInputs(){
    this.showSave = true;
    this.inputEnabled = false;
    this.showButtons = false;

  }

  cancel(){
    this.showSave = false;
    this.inputEnabled = false;
    this.showButtons = true;
    
    this.showSearch = true;
    this.showResults = false;
  }
  gotoCustomerManagment(){
    this.router.navigate(['customer-management']);
  }

   gotoPlaceOrder(){
   

    this.interaction.changeCustomerID(this.customer.CustomerID);
    this.router.navigate(['place-order'])
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

}
