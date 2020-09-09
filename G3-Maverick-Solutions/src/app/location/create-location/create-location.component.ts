import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';
import { LocationService } from '../location.service';
import { Area } from 'src/app/gps-management/model/area.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  dateVal = new Date();
  constructor(private router: Router, private service: UserService,private api: LocationService) { }
  location: Location = new Location();
  areas: Area[];
  containers: Container[];
  responseMessage: string = "Request Not Submitted";

  ngOnInit(): void {
    this.api.getAllContainers().subscribe(value => {if (value != null)(this.containers = value);})
    this.api.getAllAreas().subscribe(value => {if (value != null)(this.areas = value);})
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  addLocation(){
    this.api.addLocation(this.location).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["gps-management"])
    })

  }

  gotoGPSManagement(){
    this.router.navigate(['gps-management']);
  }


}
