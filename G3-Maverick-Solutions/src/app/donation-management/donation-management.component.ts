import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';

@Component({
  selector: 'app-donation-management',
  templateUrl: './donation-management.component.html',
  styleUrls: ['./donation-management.component.scss']
})
export class DonationManagementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { };


  dateVal = new Date();
  

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
