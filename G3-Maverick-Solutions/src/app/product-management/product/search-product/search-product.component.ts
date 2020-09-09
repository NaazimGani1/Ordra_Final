import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from '../../product.service';
import { ProductCategory } from '../../product-category';
import { Price } from '../../price';
import { Product } from '../../product';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  
  constructor(private productService: ProductService, private router: Router) { }

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
