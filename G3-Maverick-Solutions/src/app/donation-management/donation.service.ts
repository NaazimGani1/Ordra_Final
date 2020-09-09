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

  url = 'https://localhost:44399/api/Donation';    //address of REST API server

  constructor( private http: HttpClient) { }

  getAllDonations(): Observable<Donation[]>
  {
    return this.http.get<Donation[]>(this.url + '/getAllDonations');
  }

  getDonationStatuses(): Observable<DonationStatus[]>
  {
    return this.http.get<DonationStatus[]>(this.url + '/getDonationStatuses');
  }
  getDonationById(donationID: number): Observable<Donation>
  {
    return this.http.get<Donation>(this.url + '/getDonationByID' + donationID);
  }

  searchDonations(cell: string): Observable<Donation[]>
  {
    return this.http.get<Donation[]>(this.url + '/searchDonations?cell=' +cell);
  }

  addDonation(donation: Donation): Observable<Donation>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.post<Donation>(this.url + '/addDonation/', donation, httpOptions);
  }

  updateDonation(donation: Donation): Observable<Donation>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.put<Donation>(this.url + '/updateDonation/', donation, httpOptions);
  }

  deleteDonation(donationID: number): Observable<Donation>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.delete<Donation>(this.url + '/deleteDonation?donationID=' + donationID, httpOptions);
 
  }

  getAllDonatedProducts(): Observable<any[]>
  {
    return this.http.get<any[]>(this.url + '/getAllDonatedProducts');
  }

  addDonatedProduct(donatedProduct: DonatedProduct): Observable<DonatedProduct>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.post<DonatedProduct>(this.url + '/addCDonation/', donatedProduct, httpOptions);
  }

  updateDonatedProduct(donatedProduct: DonatedProduct): Observable<DonatedProduct>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.put<DonatedProduct>(this.url + '/updateDonatedProduct/', donatedProduct, httpOptions);
  }

  deleteDonatedProduct(donationID: number): Observable<Donation>
  {
    const httpOptions = { headers: new HttpHeaders ({ 'Content-Type': 'application/json'}) };
    return this.http.delete<Donation>(this.url + '/removeDonatedProduct?donationID=' + donationID, httpOptions);
 
  }

  searchDonationRecipient(cell: string): Observable<DonationRecipient>
  {
    return this.http.get<DonationRecipient>(this.url + '/searchDonationRecipient?cell=' +cell);
  }

 /*  searchSupplier(name: string): Observable<any>
  {
    return this.http.get<Donation>(this.url + '/searchSupplier?name=' +name);
  } */

}



