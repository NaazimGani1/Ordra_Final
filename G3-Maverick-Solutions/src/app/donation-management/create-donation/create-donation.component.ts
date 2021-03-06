import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';
import { DonationService } from '../donation.service';
import { DonatedProduct } from '../Models/donated-product';
import { Donation } from '../Models/donation';
import { DonationRecipient } from '../Models/donation-recipient';
import { DonationStatus } from '../Models/donation-status';
import { Container } from '../Models/container';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss']
})
export class CreateDonationComponent implements OnInit {

  constructor( private donationService: DonationService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { };

  dateVal = new Date();
  donation: Donation = new Donation();
  donationRecipient: DonationRecipient = new DonationRecipient();
  donatedProduct: DonatedProduct = new DonatedProduct();
  responseMessage: string = "Request Not Submitted";
  donationForm: any;

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  showSave: boolean = false;
  showButtons: boolean = true;
  inputEnabled:boolean = true;
  showSearch: boolean = true;
  showAddDon: boolean = false
  showResults: boolean = false;
  cell : string;

  statuses: DonationStatus[];
  containers: Container[];

  ngOnInit(): void {
    this.donationService.getDonationStatuses().subscribe(value => {
        if (value!=null){
          this.statuses = value;
        }
      });
  }

  gotoDonationManagement()
  {
    this.router.navigate(['donation-management']);
  }

  searchDonationRecipient()
  {
    this.donationService.searchDonationRecipientD(this.cell).subscribe( (res:any) =>
    {
      console.log(res);
      if(res.Message != null)
      {
        this.responseMessage = res.Message;
        alert(this.responseMessage)
      }
      else
      {
        this.donationRecipient.RecipientID = res.RecipientID;
        this.donationRecipient.DrName = res.DrName;
        this.donationRecipient.DrSurname = res.DrSurname;
        this.donationRecipient.DrCell = res. DrCell;
        this.donationRecipient.DrEmail = res.DrEmail;
      }

      if (res.Message != "Record Not Found")
      {
        this.showSearch = true;
        this.showResults = true;
        this.showAddDon = true;
      }
      

    })
  }

  addDonation( )
  {
    this.donationService.addDonation(this.donation).subscribe( (res:any)=> 
    {
      console.log(res);
      if(res.Message)
      {
        this.responseMessage = res.Message;
      }
      alert(this.responseMessage)
      this.router.navigate(["donation-management"])
    })
  }
  

  enableInputs()
  {
    this.showSave = true;
    this.inputEnabled = false;
    this.showButtons = false;
  }

  cancel()
  {
   /*  this.showSave = false;
    this.inputEnabled = false;
    this.showButtons = true;
    
    this.showSearch = true;
    this.showResults = false; */
    this.router.navigate(["donation-management"])
  }

}
