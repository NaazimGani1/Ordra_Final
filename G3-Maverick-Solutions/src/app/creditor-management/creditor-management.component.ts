import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { UserService } from 'src/app/login-subsystem/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditor-management',
  templateUrl: './creditor-management.component.html',
  styleUrls: ['./creditor-management.component.scss']
})
export class CreditorManagementComponent implements OnInit {

  constructor(public nav: NavbarService, private router: Router, private userService: UserService) { };

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
