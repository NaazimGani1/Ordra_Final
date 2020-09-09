import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  dateVal = new Date();
  constructor(private router: Router,  private service: UserService) { }

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }
  //Product Category
  gotoAddProductCategory(){
    this.router.navigate(['add-product-category']);
  }

  gotoSearchProductCategory(){
    this.router.navigate(['search-product-category']);
  }

  //Product
  gotoAddProduct(){
    this.router.navigate(['add-product']);
  }

  gotoSearchProduct(){
    this.router.navigate(['search-product']);
  }

  gotoStockTake(){
    this.router.navigate(['stock-take']);
  }

  //VAT
  gotoAddVAT(){
    this.router.navigate(['add-vat']);
  }

  gotoUpdateVAT(){
    this.router.navigate(['update-vat']);
  }

}
