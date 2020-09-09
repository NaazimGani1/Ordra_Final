import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';

@Component({
  selector: 'app-reporting-management',
  templateUrl: './reporting-management.component.html',
  styleUrls: ['./reporting-management.component.scss']
})
export class ReportingManagementComponent implements OnInit {

  constructor( private router: Router, private userService: UserService) { }
  dateVal = new Date();

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
