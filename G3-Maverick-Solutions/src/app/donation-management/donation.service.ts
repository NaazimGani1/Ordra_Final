import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donation } from './Models/donation';
import { DonatedProduct } from './Models/donated-product';
import { DonationRecipient } from './Models/donation-recipient';
import { DonationStatus } from './Models/donation-status';




@Injectable({
  providedIn: 'root'
})


export class DonationService {

  urlD = 'https://localhost:44399/api/Donation';    //address of REST API server

  constructor( private http: HttpClient) { }

  getAllDonations(): Observable<Donation[]>
  {
    return this.http.get<Donation[]>(this.urlD + '/getAllDonations');
  }

  getDonationStatuses(): Observable<DonationStatus[]>
  {
    return this.http.get<DonationStatus[]>(this.urlD + '/getDonationStatuses');
  }
  getDonationById(donationID: number): Observable<Donation>
  {
    return this.http.get<Donation>(this.urlD + '/getDonationByID' + donationID);
  }

  searchDonations(cell: string): Observable<Donation[]>
  {
    return this.http.get<Donation[]>(this.urlD + '/searchDonations?cell=' +cell);
  }

  addDonation(donation: Donation): Observable<Donation>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.post<Donation>(this.urlD + '/addDonation/', donation, httpOptions);
  }

  updateDonation(donation: Donation): Observable<Donation>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.put<Donation>(this.urlD + '/updateDonation/', donation, httpOptions);
  }

  deleteDonation(donationID: number): Observable<Donation>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.delete<Donation>(this.urlD + '/deleteDonation?donationID=' + donationID, httpOptions);
 
  }

  getAllDonatedProducts(): Observable<any[]>
  {
    return this.http.get<any[]>(this.urlD + '/getAllDonatedProducts');
  }

  addDonatedProduct(donatedProduct: DonatedProduct): Observable<DonatedProduct>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.post<DonatedProduct>(this.urlD + '/addCDonation/', donatedProduct, httpOptions);
  }

  updateDonatedProduct(donatedProduct: DonatedProduct): Observable<DonatedProduct>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.put<DonatedProduct>(this.urlD + '/updateDonatedProduct/', donatedProduct, httpOptions);
  }

  deleteDonatedProduct(donationID: number): Observable<Donation>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.delete<Donation>(this.urlD + '/removeDonatedProduct?donationID=' + donationID, httpOptions);
 
  }

  searchDonationRecipientD(cell: string): Observable<DonationRecipient>
  {
    return this.http.get<DonationRecipient>(this.urlD + '/searchDonationRecipient?cell=' +cell);
  }

 /*  searchSupplier(name: string): Observable<any>
  {
    return this.http.get<Donation>(this.url + '/searchSupplier?name=' +name);
  } */


  //donation recipient url
  url = 'https://localhost:44399/API/DonationRecipient'

  //get all donation recipient
  getAllDonationRecipients(): Observable<DonationRecipient[]> {  
    return this.http.get<DonationRecipient[]>(this.url + '/GetAllDonationRecipients');  
  }
  
  //get donation recipient by id
  getDonationRecipient(Id: number): Observable<DonationRecipient> {  
    return this.http.get<DonationRecipient>(this.url + '/GetDonationRecipient/' + Id);  
  } 
  
  //search donation recipient
   searchDonationRecipient(name: string, surname: string): Observable<DonationRecipient> {  
    return this.http.get<DonationRecipient>(this.url + '/searchDonationRecipient?name='+name+'&surname='+surname);  
  }

  //add donation recipient
  addDonationRecipient(donationRecipient: DonationRecipient): Observable<DonationRecipient> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<DonationRecipient>(this.url + '/AddDonationRecipient',  
    donationRecipient, httpOptions);  
  }  

  //updatedonation recipient
  updateDonationRecipient(donationRecipient: DonationRecipient): Observable<DonationRecipient> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<DonationRecipient>(this.url + '/UpdateDonationRecipient',  
    donationRecipient, httpOptions);  
  }  

  //delete donation recipient
  deleteDonationRecipient(Id: number): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteDonationRecipient?id=' + Id,  
 httpOptions);  
  } 
}

