import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from '../../product.service';
import { ProductCategory } from '../../product-category';
import { Price } from '../../price';
import { Product } from '../../product';
import { UserService } from 'src/app/login-subsystem/service/user.service';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  dateVal = new Date();
  constructor(private productService: ProductService, private router: Router,  private service: UserService) { }

  catSelection: number;
  
  categoryList: ProductCategory[] = [];
  catName: string;

  product: Product = new Product();
  responseMessage: string = "Request Not Submitted"

  products: Product[]=[];
  

  name : string;
  ngOnInit() {
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
  Search(){
    this.name = this.catName;
    this.productService.searchProductByCategory(this.name).subscribe((res:any)=>{
      console.log(res);
      if(res.Message != null){
        this.responseMessage = res.Message;
        alert(this.responseMessage)}
        this.product.ProdName = res.ProdName;
        this.product.ProdDesciption = res.ProdDesciption;

        this.products.push(this.product) ;
    })
  }

  loadProducts(val:ProductCategory){
      this.catName = val.PCatName;
  }
  Cancel(){
    this.router.navigate(["product-management"])
  }

  View(){
    this.router.navigate(['searched-product-details']);
  }

}
