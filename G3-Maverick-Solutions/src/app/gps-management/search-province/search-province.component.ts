import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProvinceService } from '../services/province.service';
import { Province } from '../model/province.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';


@Component({
  selector: 'app-search-province',
  templateUrl: './search-province.component.html',
  styleUrls: ['./search-province.component.scss']
})
export class SearchProvinceComponent implements OnInit {
  
  dateVal = new Date();

  constructor(private provinceService: ProvinceService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { 
    
  };

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
