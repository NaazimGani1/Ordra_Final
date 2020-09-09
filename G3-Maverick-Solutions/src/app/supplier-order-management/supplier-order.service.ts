import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SupplierOrder } from './supplier-order';
import { Product } from './product-backlog';
import { SupplierDetail } from './supplier-detail';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderService {

  constructor(private http:HttpClient) { }

  url = 'https://localhost:44399/Api/SupplierOrder'

  getProducts(): Observable<Product[]> {  
    return this.http.get<Product[]>(this.url + '/getProducts');  
  }

  getSuppliers(name: string){  
    return this.http.get(this.url + '/getSuppliers?name='+name).pipe(map(result => result));  
  } 

}
