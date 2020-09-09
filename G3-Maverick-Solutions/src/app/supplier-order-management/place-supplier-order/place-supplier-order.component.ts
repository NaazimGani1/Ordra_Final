import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {SupplierOrder} from '../supplier-order';
import { NgModule } from '@angular/core';
import {SupplierOrderService} from '../supplier-order.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from '../product-backlog';
import { Supplier } from './supplier';

@Component({
  selector: 'app-place-supplier-order',
  templateUrl: './place-supplier-order.component.html',
  styleUrls: ['./place-supplier-order.component.scss']
})
export class PlaceSupplierOrderComponent implements OnInit {
  dateVal = new Date();
  private _allProducts: Observable<Product[]>;  
  public get allProducts(): Observable<Product[]> {  
    return this._allProducts;  
  }
  public set allProducts(value: Observable<Product[]>) {  
    this._allProducts = value;  
  }  

  private _allSuppliers: Observable<Supplier[]>;  
  public get allSuppliers(): Observable<Supplier[]> {  
    return this._allSuppliers;  
  }
  public set allSuppliers(value: Observable<Supplier[]>) {  
    this._allSuppliers = value;  
  } 

  constructor(public api:SupplierOrderService,private router: Router) { }
  allowEdit:boolean = false;
  supplier: Supplier = new Supplier();
  product: Product = new Product();
  responseMessage: string = "Request Not Submitted";
  suppliers: Supplier[] = [];

  showSave: boolean = false;
 showTable: boolean = true;
 showButtons: boolean = true;
 inputEnabled:boolean = true;
 showSearch: boolean = true;
 showResults: boolean = false;
 showConatinerSelect: boolean = false;


 name : string;

  loadDisplay(){  
    debugger;  
    this.allProducts= this.api.getProducts();    
  }  

  ngOnInit() {  
    this.loadDisplay();  

  }  

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  getSuppliers(){
    this.api.getSuppliers(this.name).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message != null){
        this.responseMessage = res.Message;
        alert(this.responseMessage)}
        else{

        this.supplier.SupName = res.supplier.SupName;
        this.supplier.SupCell = res.supplier.SupCell;
        this.supplier.SupEmail = res.supplier.SupEmail;
        this.supplier.SupStreet = res.supplier.SupStreet;
        this.supplier.SupStreetNr = res.supplier.SupStreetNr;
        this.supplier.SupCode = res.supplier.SupCode;
        this.supplier.SupSuburb =  res.supplier.SupSuburb;


        //Get User Details
        this.product.ProdName = res.product.ProdName;

        

        //Get list Of Containers
        this.suppliers = res.suppliers;
      }

      
      this.showSearch = false;
      this.showResults = true;
      
    })

  }

}
