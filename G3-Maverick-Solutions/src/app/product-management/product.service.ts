import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { ProductCategory } from './product-category'; 
import { Vat } from './vat';
import { Product } from './product';
import { Price } from './price';
import { StockTake } from './stock-take';
import { MarkedOff } from './marked-off';
import { MarkedOffReason } from './marked-off-reason';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'https://localhost:44399/API/Product'
  constructor(private http: HttpClient) { }

  
  getAllProductCategory(): Observable<ProductCategory[]> {  
    return this.http.get<ProductCategory[]>(this.url + '/GetAllProductCategories');  
  } 

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + '/GetAllProducts');
  }
  
  getProductById(Id: number): Observable<Product> {  
    return this.http.get<Product>(this.url + '/GetProduct/' + Id);  
  } 

  searchProductByCategory(name: string): Observable<Product> {  
    return this.http.get<Product>(this.url + '/SearchProductByCategory?name=' + name );  
  }  


  addProduct(product: Product): Observable<Product>   {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Product>(this.url + '/AddProduct',  
    product, httpOptions);  
  }  
  updateProduct(product: Product): Observable<Product> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Product>(this.url + '/UpdateProduct/',  
    product, httpOptions);  
  }  

  deleteProductById(productId: number): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/deleteProduct?id=' + productId,  
 httpOptions);  
  } 

  addStockTake(stockTake: StockTake): Observable<StockTake> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<StockTake>(this.url + '/AddStockTake',  
    stockTake, httpOptions);  
  }  

  getAllMarkedOffReasons(): Observable<MarkedOffReason[]> {  
    return this.http.get<MarkedOffReason[]>(this.url + '/GetAllMarkedOffReasons');  
  } 

  addMarkedOffProduct(markedOff: MarkedOff): Observable<MarkedOff>   {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<MarkedOff>(this.url + '/AddMarkedOff',  
    markedOff, httpOptions);  
  }  

 // generateNotification(): Observable<MarkedOffReason[]> {  
  //  return this.http.get<MarkedOffReason[]>(this.url + '/GenerateNotification');  
  //}

  getVat() : Observable<Vat[]>{
    return this.http.get<Vat[]>(this.url + '/GetVat');
  }

  addVat(vat: Vat): Observable<Vat> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Vat>(this.url + '/AddVat',  
    vat, httpOptions);  
  }  

  updateVat(vat: Vat): Observable<Vat> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Vat>(this.url + '/UpdateVat/',  
    vat, httpOptions);  
  }  
}
