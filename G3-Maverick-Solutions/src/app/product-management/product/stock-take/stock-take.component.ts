import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from '../../product.service';
import { ProductCategory } from '../../product-category';
import { MarkedOffReason } from '../../marked-off-reason'
import { MarkedOff } from '../../marked-off';
import { Product } from '../../product';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { UserService } from 'src/app/login-subsystem/service/user.service';
@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.scss']
})
export class StockTakeComponent implements OnInit {
  dateVal = new Date();
  showStockTake = false;
  showMarkedOff = false;

  prodSelection: number;
  reSelection: number;
  selectedProdID: number;
  selectedMoRID: number;
  quantity: number = 0;
  date: Date;

  

  categories: ProductCategory[];
  reasonList : MarkedOffReason[] = [];
  productList: Product[] = [];

  



  markedOffProducts: MarkedOff = new MarkedOff();
  responseMessage: string = "Request Not Submitted";

  constructor(private productService: ProductService, private router: Router,public nav: NavbarService,  private service: UserService) { }
  ngOnInit() {
    this.productService.getAllProductCategory()
      .subscribe(value => {
        if (value != null) {
          this.categories = value;
        }
      });

      this.productService.getAllMarkedOffReasons()
      .subscribe(res => {
        if (res != null){
          this.reasonList = res;
        }
      });

      this.productService.getAllProducts()
      .subscribe(prod =>{
        if(prod !=null){
          this.productList =prod;
        }
      })
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }
  //Stock Take
  StockTake(){
    this.showStockTake=true;
    this.showMarkedOff=false;
  }

  Add(){}

  Remove(){}

  Save(){}

  Cancel(){
    this.router.navigate(["product-management"])
  }

  //Marked-Off
  MarkedOff(){
    this.showMarkedOff=true;
    this.showStockTake=false;
  }


loadProduct(val: Product){
  this.selectedProdID = val.ProductID;
  this.markedOffProducts.ProductID =this.selectedProdID;

  
}

loadReason(val: MarkedOffReason){
  this.selectedMoRID = val.ReasonID;
  this.markedOffProducts.ReasonID = this.selectedMoRID;
}



AddMO(){
    
  

}


  RemoveMO(){}

  SaveMO(){
    this.productService.addMarkedOffProduct(this.markedOffProducts).subscribe( (res: any)=> {
      console.log(res);
      if(res.Message){
        this.responseMessage = res.Message;}
        alert(this.responseMessage)
        this.router.navigate(["product-management"]);
   })
}

  CancelMO(){
    this.router.navigate(["product-management"])
  }

}
