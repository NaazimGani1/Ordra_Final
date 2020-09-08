import { Component, OnInit } from '@angular/core';
import { AreaserviceService } from '../gps-management/services/areaservice.service';
import { Area } from '../gps-management/model/area.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Status } from '../gps-management/model/status.model';
import { Province } from '../gps-management/model/province.model';

@Component({
  selector: 'app-gps-management',
  templateUrl: './gps-management.component.html',
  styleUrls: ['./gps-management.component.scss']
})
export class GPSManagementComponent implements OnInit {
  title = 'ORDRA';
  dateVal = new Date();
  
  main = true;
  add = false;
  search = false;
  searchFound = false;

  formModel1 = {
    AreaStatusID:0,
    ProvinceID:0,
    ArName: '',
    ArPostalCode:''
  };

  formModel2= {
    AreaStatusID:0,
    ProvinceID:0,
    ArName: '',
    ArPostalCode:''
  };

  constructor(public service: AreaserviceService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
   this.refreshList();
   console.log(this.service.provinceList)
  }
  
  onHome() {
    this.router.navigate(['/home']);
  }


  refreshList() {
    this.service.getAreas().then(res => this.service.allareaList = res as Area[]);
    this.service.getStatus().then(res => this.service.statusList = res as Status[]);
    this.service.getProvince().then(res => this.service.provinceList = res as Province[]);
  }


  onSearchArea(form: NgForm) {
    this.service.search(form.value).subscribe(
      (res: any) => {
        if(res =='NotFound')
        {
          console.log(res);
          this.add = false;
          this.main = true;
          this.toastr.error('UH Oh', ' No Area Found :( ');
        }
        else
        {
          this.service.areaList = res as Area[];
          console.log(this.service.areaList);
          this.main = false;
          this.search = false;
          this.searchFound = true;
          this.toastr.success('Success', 'Area Found :)');
        }
    });
  }

  submitArea(form: NgForm) {
    console.log(form);
      this.service.postArea(form.value).subscribe((res: any) => {
        console.log(res);
        if (res !='Error' && res !='Nothing')
        {
          console.log(res);
          this.main = true;
          this.add = false;
          this.toastr.success('Success', 'Area Has been Added :)');
        }
        else
        {
          console.log(res);
          this.toastr.error('Uh Oh ', 'Something Went Wrong. Please Try again');
        }
      });  
  }


//Selectors
  selectStatus(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.service.statusData.AreaStatusID = 0;
    } else {
      this.service.statusData.AreaStatusID = this.service.statusList[ctrl.selectedIndex - 1].AreaStatusID;
    }
  }

  selectProvince(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.service.provinceData.ProvinceID = 0;
    } else {
      this.service.provinceData.ProvinceID = this.service.provinceList[ctrl.selectedIndex - 1].ProvinceID;
    }
  }

  clear()
  {
    window.location.reload()
  }

  Create()
  {
    this.main = false;
    this.add = true;
  }

  Search()
  {
    this.main = false;
    this.search = true;
  }
  
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
