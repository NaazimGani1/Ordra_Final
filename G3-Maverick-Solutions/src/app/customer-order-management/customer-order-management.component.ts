import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-order-management',
  templateUrl: './customer-order-management.component.html',
  styleUrls: ['./customer-order-management.component.scss']
})
export class CustomerOrderManagementComponent implements OnInit {

  constructor(private router : Router) { }
  dateVal: Date;

  ngOnInit(): void {
  }
  
  gotoPlaceOrder(){
    this.router.navigate(['place-order']);
  }

  gotoSearchOrder(){
    this.router.navigate(['view-order']);
  }

  gotoSendNotification(){
    this.router.navigate(['send-notification']);
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

}
