import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductCategoryService } from '../../product-category.service';
import { ProductCategory } from '../../product-category';
import { UserService } from 'src/app/login-subsystem/service/user.service';
@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {
  dateVal = new Date();
  constructor(private productCategoryService: ProductCategoryService, private router: Router, private service: UserService) { }

  productCategory : ProductCategory = new ProductCategory();
  responseMessage: string = "Request Not Submitted";


  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }
  Save() {
    this.productCategoryService.addProductCategory(this.productCategory).subscribe( (res: any)=> {
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
