import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-management',
  templateUrl: './manager-management.component.html',
  styleUrls: ['./manager-management.component.scss']
})
export class ManagerManagementComponent implements OnInit {

  constructor(private router: Router) { }

  dateVal = new Date();

  ngOnInit(): void {
  }

  gotoCreateManager(){
    this.router.navigate(['create-manager']);
  }

  gotoSearchManager(){
    this.router.navigate(['view-manager']);
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }


}

