import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable, from } from 'rxjs'; 
import {CustomerOrder} from './customer-order';
import{map} from 'rxjs/operators';
//import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

 


  constructor(private http: HttpClient) { }

  
  /*private customerIDSource = new BehaviorSubject<number>();
  currentCustomerID = this.customerIDSource.asObservable();
  changeCustomerID(customerID: number){
    this.currentCustomerID.next(customerID);
  }*/




  private customerIDSource = new Subject<number>();
  currentCustomerID = this.customerIDSource.asObservable;
  //customerId$ =this.customerIDSourse.asObservable();

  changeCustomerID(customerID : number){
    this.customerIDSource.next(customerID);
  }





  url = 'https://localhost:44399/Api/CustomerOrders'

  searchByCell(cell : string){  
    return this.http.get(this.url + '/searchByCell/'+cell).pipe(map(result => result));  
  } 
  
  searchByOrderNo(orderNo : string){  
    return this.http.get(this.url + '/searchByOrderNo/'+orderNo).pipe(map(result => result));  
  } 

  initiatePlaceOrder(customerID : number ){
    return this.http.get(this.url + '/initiatePlaceOrder/'+customerID).pipe(map(result => result)); 

  }

  placeOrder(order: CustomerOrder) : Observable<CustomerOrder>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<CustomerOrder>(this.url + '/placeOrder',  
    order, httpOptions); 
  }

  cancelOrder(CustomerOrderID : number){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + '/cancelOrder',  
    CustomerOrderID, httpOptions); 
  }

  collectOrder(CustomerOrderID : number){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + '/collectOrder',  
    CustomerOrderID, httpOptions); 
  }

  sendNotification(selectedOrders: string[]){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<CustomerOrder[]>(this.url + '/sendNotification',  
    selectedOrders, httpOptions); 
  }

  getOrdersByStatus(status: string){
    return this.http.get(this.url + '/getOrdersByStatus?status=' +status).pipe(map(result => result))
  }

  searchCustomer(name: string, surname: string) {  
    return this.http.get('https://localhost:44399/Api/Customer/searchCustomer?name='+name+'&surname='+surname);  
  }

}
