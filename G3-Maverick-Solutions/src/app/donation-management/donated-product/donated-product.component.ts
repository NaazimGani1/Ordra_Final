import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { UserService } from 'src/app/login-subsystem/service/user.service';
import { DonationService } from '../donation.service';
import { DonatedProduct } from '../Models/donated-product';
import { Donation } from '../Models/donation';
import { DonationRecipient } from '../Models/donation-recipient';
import { DonationStatus } from '../Models/donation-status';
import { Container } from '../Models/container';

@Component({
  selector: 'app-donated-product',
  templateUrl: './donated-product.component.html',
  styleUrls: ['./donated-product.component.scss']
})
export class DonatedProductComponent implements OnInit {

  constructor(public nav: NavbarService, private donationService: DonationService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { };

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

}
