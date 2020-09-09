import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';

@Component({
  selector: 'app-donation-management',
  templateUrl: './donation-management.component.html',
  styleUrls: ['./donation-management.component.scss']
})
export class DonationManagementComponent implements OnInit {
  dateVal = new Date();
  constructor(private router: Router,  private service: UserService) { }

  ngOnInit(): void {
  }

  gotoAddDonationRecipient(){
    this.router.navigate(['add-donation-recipient']);
  }

  gotoSearchDonationRecipient(){
    this.router.navigate(['search-donation-recipient']);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

}
