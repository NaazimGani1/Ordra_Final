import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from '../../product.service';
import { ProductCategory } from '../../product-category';
import { Price } from '../../price';
import { Product } from '../../product';
import { UserService } from 'src/app/login-subsystem/service/user.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  dateVal = new Date();
  constructor(private productService: ProductService, private router: Router,   private service: UserService) { }

  catSelection: number;
  selectedCatID: number;
  categoryList: ProductCategory[] = [];
  product : Product = new Product();
  price : Price = new Price();
  responseMessage: string = "Request Not Submitted";

  ngOnInit(){
    this.productService.getAllProductCategory()
      .subscribe(value => {
        if (value != null) {
          this.categoryList = value;
        }
      });
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  loadProducts(val: ProductCategory){
    this.selectedCatID = val.ProductCategoryID;
    this.product.ProductCategoryID = this.selectedCatID;

  }

  Save(){
    this.product.Prices.push(this.price);
    this.productService.addProduct(this.product).subscribe( (res: any)=> {
      console.log(res);
      if(res.Message){
        this.responseMessage = res.Message;}
        alert(this.responseMessage)
        this.router.navigate(["product-management"])
    })
    
  }

  Cancel(){
    this.router.navigate(["product-management"])
  }
}
