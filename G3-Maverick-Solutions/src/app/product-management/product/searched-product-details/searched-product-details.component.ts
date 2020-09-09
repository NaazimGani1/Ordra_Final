import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from '../../product.service';
import { ProductCategory } from '../../product-category';
import { Price } from '../../price';
import { Product } from '../../product';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { UserService } from 'src/app/login-subsystem/service/user.service';

@Component({
  selector: 'app-searched-product-details',
  templateUrl: './searched-product-details.component.html',
  styleUrls: ['./searched-product-details.component.scss']
})
export class SearchedProductDetailsComponent implements OnInit {
  dateVal = new Date();
  constructor(private productService: ProductService, private router: Router,public nav: NavbarService,  private service: UserService) { }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  Update(){
   
  }

  Remove(){}

  Save(){}

  Cancel(){
    this.router.navigate(["product-management"])
  }
  

}
