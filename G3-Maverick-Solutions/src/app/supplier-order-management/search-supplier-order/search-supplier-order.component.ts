import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-supplier-order',
  templateUrl: './search-supplier-order.component.html',
  styleUrls: ['./search-supplier-order.component.scss']
})
export class SearchSupplierOrderComponent implements OnInit {
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
