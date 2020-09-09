import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-order-management',
  templateUrl: './supplier-order-management.component.html',
  styleUrls: ['./supplier-order-management.component.scss']
})
export class SupplierOrderManagementComponent implements OnInit {
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
