import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { Vat } from '../../vat';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-update-vat',
  templateUrl: './update-vat.component.html',
  styleUrls: ['./update-vat.component.scss']
})
export class UpdateVatComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }
  responseMessage: string = "Request Not Submitted";

  vat : Vat = new Vat();

  ngOnInit() {
    this.loadVat();
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
