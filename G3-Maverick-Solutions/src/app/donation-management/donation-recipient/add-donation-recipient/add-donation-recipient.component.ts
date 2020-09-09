import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonationRecipient } from '../../donation-recipient';
import { NgModule } from '@angular/core';
import { DonationService } from '../../donation.service';
import { UserService } from 'src/app/login-subsystem/service/user.service';
@Component({
  selector: 'app-add-donation-recipient',
  templateUrl: './add-donation-recipient.component.html',
  styleUrls: ['./add-donation-recipient.component.scss']
})
export class AddDonationRecipientComponent implements OnInit {
  dateVal = new Date();
  constructor(private donationService: DonationService, private router: Router,   private service: UserService) { }

  donationRecipient : DonationRecipient = new DonationRecipient();
  responseMessage: string = "Request Not Submitted";

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }


  Save(){
    this.donationService.addDonationRecipient(this.donationRecipient).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["donation-management"])
    })
  }

  Cancel(){
    this.router.navigate(["donation-management"])
  }

}
