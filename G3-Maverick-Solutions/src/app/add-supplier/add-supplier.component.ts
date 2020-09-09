import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../supplier-management/supplier.service';
import { Router } from '@angular/router';
import {Supplier} from '../supplier-management/supplier';


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {


  constructor(private api: SupplierService, private router: Router) { }

  dateVal: Date;

  supplier : Supplier = new Supplier();
  responseMessage: string = "Request Not Submitted";

  ngOnInit(): void {
  }

  addSupplier(){
    this.api.addSupplier(this.supplier).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["supplier-management"])
    })

  }

  gotoSupplierManagement(){
    this.router.navigate(['supplier-management']);
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

}
