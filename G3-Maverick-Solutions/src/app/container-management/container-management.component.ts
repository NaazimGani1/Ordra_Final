import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';

@Component({
  selector: 'app-container-management',
  templateUrl: './container-management.component.html',
  styleUrls: ['./container-management.component.scss']
})
export class ContainerManagementComponent implements OnInit {

  dateVal = new Date();
  constructor(private router: Router,  private service: UserService) { }

  ngOnInit(): void {
  }

  gotoCreateContainer(){
    this.router.navigate(['create-container']);
  }

  gotoSearchContainer(){
    this.router.navigate(['search-container']);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

}
