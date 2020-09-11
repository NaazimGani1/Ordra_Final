import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from '../../product.service';
import { ProductCategory } from '../../product-category';
import { Price } from '../../price';
import { Product } from '../../product';
import { UserService } from 'src/app/login-subsystem/service/user.service';
import { ProductDetails } from 'src/app/customer-order-management/product-details';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  dateVal = new Date();
  constructor(private productService: ProductService, private router: Router,  private service: UserService) { }

  catSelection: number;
 price: Price;
  categoryList: ProductCategory[] = [];
selectedCategory: ProductCategory;
 inputEnabled = true;
	
  catName: string;
selectedProdName: string;
searchedProduct: ProductDetails = new ProductDetails();
showResults = false;
updateProd: Product = new Product();
updatePrice: Price = new Price();
prices: Price[] = [];
ProductID: number;
ProductCategoryID: number;
PCatName: string;
ProdName: string;
ProdDescription: string;
ProdReLevel: number;
UPriceR: number;
CPriceR: number;
PriceStartDate: Date;
PriceEndDate: Date;

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

loadProducts(val : ProductCategory ){
	this.selectedCategory = val;
}
  Search(){
   
    this.productService.searchProductByCategory(this.selectedCategory.PCatName).subscribe((res:any)=>{
      console.log(res);
      if(res.Message != null){
        this.responseMessage = res.Message;
        alert(this.responseMessage);
      }
  else
  {
    this.products = res ;
  }

        
    })
  }

 
  Cancel(){
    this.router.navigate(["product-management"])
  }

  View(val: string){
	this.selectedProdName = val;
	this.searchProd();
    
  }

searchProd(){
this.productService.searchProductByName(this.selectedProdName).subscribe((res:any)=>{
      console.log(res);
      if(res.Message != null){
        this.responseMessage = res.Message;
        alert(this.responseMessage);
      }
	else{
        		
                        this.product.ProductID = res.ProductID;
                      	this.product.ProductCategoryID = res.ProductCategoryID;
                       	this.selectedCategory.PCatName = res.Product_Category.PCatName;
                        this.product.ProdName = res.ProdName;
                        this.product.ProdDesciption = res.ProdDesciption;
                      	this.product.ProdReLevel = res.ProdReLevel;
                        this.price.UPriceR = res.UPriceR;
                        this.price.CPriceR = res.CPriceR;
                        this.price.PriceStartDate = res.Price.PriceStartDate;
                        this.price.PriceEndDate = res.PriceEndDate;
		}
    })
	this.showResults = true;
}

update(){
	this.inputEnabled = false;
}

	
save(){
			this.updateProd.ProductID = this.product.ProductID;
                      	this.updateProd.ProductCategoryID = this.selectedCategory.ProductCategoryID;
                        this.updateProd.ProductCategoryID = this.product.ProductCategoryID;
                        this.updateProd.ProdName = this.product.ProdName;
                        this.updateProd.ProdDesciption = this.product.ProdDesciption;
                      	this.updateProd.ProdReLevel = this.product.ProdReLevel;
			
			this.updatePrice.ProductID = this.product.ProductID
                        this.updatePrice.UPriceR = this.price.UPriceR;
                        this.updatePrice.CPriceR = this.price.CPriceR;
                        this.updatePrice.PriceStartDate = this.price.PriceStartDate;
                        this.updatePrice.PriceEndDate = this.price.PriceEndDate;
			this.prices.push(this.updatePrice);
			
			this.updateProd.Prices = this.prices;


			this.updateProduct();
}

updateProduct(){
this.productService.UpdateProduct(this.updateProd).subscribe((res:any)=>{
      console.log(res);
      if(res.Message != null){
        this.responseMessage = res.Message;
        alert(this.responseMessage);
}})}


delete(){
	this.productService.deleteProductById(this.product.ProductID).subscribe((res:any)=>{
      console.log(res);
      if(res.Message != null){
        this.responseMessage = res.Message;
        alert(this.responseMessage);

    }
	
  }
  )}}
