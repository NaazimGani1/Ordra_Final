import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditor-management',
  templateUrl: './creditor-management.component.html',
  styleUrls: ['./creditor-management.component.scss']
})
export class CreditorManagementComponent implements OnInit {
  dateVal = new Date();

  constructor(private router: Router) { }

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
