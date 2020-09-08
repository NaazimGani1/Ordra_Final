import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CreditorPayment} from './creditor-payment';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditorPaymentService {

  constructor(private http:HttpClient) { }

  url = 'https://localhost:44399/Api/CreditorPayment'

  getAllCreditorPayments(): Observable<CreditorPayment[]> {  
    return this.http.get<CreditorPayment[]>(this.url + '/getAllCreditorPayments');  
  }

  getCreditorPayment(Id: number): Observable<CreditorPayment> {  
    return this.http.get<CreditorPayment>(this.url + '/getCreditorPayment/' + Id);  
  } 

  searchCreditorPayment():Observable<CreditorPayment[]>  
  {  
    return this.http.get<CreditorPayment[]>(this.url + '/searchCreditorPayment');  
  }   


}
