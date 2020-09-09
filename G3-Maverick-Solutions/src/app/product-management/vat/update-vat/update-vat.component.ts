import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { Vat } from '../../vat';
import { NgModule } from '@angular/core';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { UserService } from 'src/app/login-subsystem/service/user.service';
@Component({
  selector: 'app-update-vat',
  templateUrl: './update-vat.component.html',
  styleUrls: ['./update-vat.component.scss']
})
export class UpdateVatComponent implements OnInit {
  dateVal = new Date();
  constructor(private productService: ProductService, private router: Router, public nav: NavbarService,  private service: UserService) { }
  responseMessage: string = "Request Not Submitted";

  vat : Vat = new Vat();

  ngOnInit() {
    this.loadVat();
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }
  loadVat(){
    this.productService.getVat().subscribe((res:any)=> {
      console.log(res);
      this.vat.VATPerc = res.VATPerc;
      this.vat.VATStartDate = res.VATStartDate;
      this.vat.VATEndDate = res.VATEndDate;
      })
  }
  Save(){
    this.productService.updateVat(this.vat).subscribe( (res:any)=> {
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
