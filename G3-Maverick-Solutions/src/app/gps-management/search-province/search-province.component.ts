import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import { ProvinceService } from '../services/province.service';
import { Province } from '../model/province.model';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { UserService } from 'src/app/login-subsystem/service/user.service';
import { NavbarService } from 'src/app/navbar/navbar.service';


@Component({
  selector: 'app-search-province',
  templateUrl: './search-province.component.html',
  styleUrls: ['./search-province.component.scss']
})
export class SearchProvinceComponent implements OnInit {
  
  dateVal = new Date();

  constructor(public nav: NavbarService, private provinceService: ProvinceService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { };

  province : Province = new Province();
  responseMessage: string = "Request Not Submitted";

  showSave: boolean = false;
  showButtons: boolean = true;
  inputEnabled:boolean = true;
  showSearch: boolean = true;
  showResults: boolean = false;
  name : string  

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  gotoGPSManagement()
  {
    this.router.navigate(['gps-management']);
  }

  searchProvince()
  {
    this.provinceService.searchProvince(this.name).subscribe( (res:any) =>
    {
      console.log(res);
      if(res.Message != null)
      {
        this.responseMessage = res.Message;
        alert(this.responseMessage)
      }
      else
      {
        this.province.ProvinceID = res.ProvinceID;
        this.province.ProvName = res.ProvName;
        this.showSearch = true;
        this.showResults = true;
      }

      

    })
  }

  updateProvince(){
    this.provinceService.updateProvince(this.province).subscribe( (res:any)=> 
    {
      console.log(res);
      if(res.Message)
      {
        this.responseMessage = res.Message;
      }
      alert(this.responseMessage)
      this.router.navigate(["gps-management"])
    })

  }

  removeProvince()
  {
    this.provinceService.removeProvince(this.province.ProvinceID).subscribe( (res:any)=> 
    {
      console.log(res);
      if(res.Message)
      {
        this.responseMessage = res.Message;
      }
      alert(this.responseMessage)
      this.router.navigate(["gps-management"])
    })

  }

  enableInputs()
  {
    this.showSave = true;
    this.inputEnabled = false;
    this.showButtons = false;
  }

  cancel()
  {
    /* this.showSave = false;
    this.inputEnabled = false;
    this.showButtons = true;
    
    this.showSearch = true;
    this.showResults = false; */

    this.router.navigate(["gps-management"])
  }


}
