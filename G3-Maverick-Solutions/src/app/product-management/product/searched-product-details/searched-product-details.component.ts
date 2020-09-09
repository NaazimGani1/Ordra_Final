import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from '../../product.service';
import { ProductCategory } from '../../product-category';
import { Price } from '../../price';
import { Product } from '../../product';

@Component({
  selector: 'app-searched-product-details',
  templateUrl: './searched-product-details.component.html',
  styleUrls: ['./searched-product-details.component.scss']
})
export class SearchedProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  Update(){
   
  }

  Remove(){}

  Save(){}

  Cancel(){
    this.router.navigate(["product-management"])
  }
  

}
