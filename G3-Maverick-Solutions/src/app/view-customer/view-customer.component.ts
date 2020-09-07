import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

var inputEnabled = false;

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})



export class ViewCustomerComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  enableInputs(){
    
    inputEnabled = true;
    this.router.navigate(['view-customer']);
  }

}
