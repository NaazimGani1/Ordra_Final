import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonationRecipient } from 'src/app/donation-management/Models/donation-recipient';
import { NgModule } from '@angular/core';
import {DonationService} from '../../donation.service';
import { UserService } from 'src/app/login-subsystem/service/user.service';
@Component({
  selector: 'app-search-donation-recipient',
  templateUrl: './search-donation-recipient.component.html',
  styleUrls: ['./search-donation-recipient.component.scss']
})
export class SearchDonationRecipientComponent implements OnInit {
  dateVal = new Date();
  constructor(private donationSerive: DonationService, private router: Router,  private service: UserService) { }

  donationRecipient : DonationRecipient = new DonationRecipient();
  responseMessage: string = "Request Not Submitted";

  showSave: boolean = false;
  showButtons: boolean = true;
  inputEnabled:boolean = true;
  showSearch: boolean = true;
  showResults: boolean = false;

  name : string;
  surname : string;

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }
  Search(){
    this.donationSerive.searchDonationRecipient(this.name,this.surname).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message != null){
      this.responseMessage = res.Message;
      alert(this.responseMessage)}
      else{
          this.donationRecipient.RecipientID = res.RecipientID;
          this.donationRecipient.DrName = res.DrName;
          this.donationRecipient.DrSurname = res.DrSurname;
          this.donationRecipient.DrCell = res.DrCell;
          this.donationRecipient.DrEmail = res.DrEmail;
          this.donationRecipient.DrStreetNr = res.DrStreetNr;
          this.donationRecipient.DrStreet = res.DrStreet;
          this.donationRecipient.DrCode = res.DrCode;
          this.donationRecipient.DrArea = res.DrArea;
      }
      
      this.showSearch = true;
      this.showResults = true;
      
    })
  }

  Cancel(){
    this.router.navigate(["donation-management"])
  }

  Update(){
    this.showSave = true;
    this.inputEnabled = false;
    this.showButtons = false;
  }

  Save(){
    this.donationSerive.updateDonationRecipient(this.donationRecipient).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["donation-management"])
    })
  }
  
  Delete(){
    this.donationSerive.deleteDonationRecipient(this.donationRecipient.RecipientID).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["donation-management"])
    })
  }

  cancel(){
    this.showSave = false;
    this.inputEnabled = false;
    this.showButtons = true;
    
    this.showSearch = true;
    this.showResults = false;
  }


}
