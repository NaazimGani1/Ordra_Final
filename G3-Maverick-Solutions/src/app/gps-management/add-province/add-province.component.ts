import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProvinceService } from '../services/province.service';
import { Province } from '../model/province.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';

@Component({
  selector: 'app-add-province',
  templateUrl: './add-province.component.html',
  styleUrls: ['./add-province.component.scss']
})
export class AddProvinceComponent implements OnInit {

  dataSaved = false;
  provinceForm : any;
  provinceIDUpdate = null;
  message = null; 

  dateVal = new Date();

  constructor( private provinceService: ProvinceService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { };

  province : Province = new Province();
  responseMessage: string = "Request Not Submitted";

  showSave: boolean = false;
  showButtons: boolean = true;
  inputEnabled:boolean = true;
  showSearch: boolean = true;
  showResults: boolean = false;
  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  addProvince()
  {
     this.provinceService.addProvince(this.province).subscribe( (res:any)=> 
    {
      console.log(res);
      if(res.Message)
      {
        this.responseMessage = res.Message;
      }
      alert(this.responseMessage)
      this.router.navigate(["gps-management"])
    }) 
  
    
  
  
    /*  if (this.provinceIDUpdate == null)
    {
      this.provinceService.addProvince(this.province).subscribe(
        (res:any) => {
          this.dataSaved = true;
          this.provinceIDUpdate = null;
          
        }
      );
    }
    else
    {
      this.province.ProvinceID = this.provinceIDUpdate;
      this.provinceService.updateProvince(this.province).subscribe(
        () => {
          this.dataSaved = true;
          this.provinceIDUpdate = null;
        }
      );
    }  */
  
  }
  
  
    Cancel(){
      this.router.navigate(["gps-management"])
    }
}
