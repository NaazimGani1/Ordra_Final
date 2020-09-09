import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';
import {Container} from '../container-management/container';
import { NgModule } from '@angular/core';
import {ContainerService} from '../container-management/container.service';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
  dateVal = new Date();
  constructor(private api: ContainerService,private router: Router,   private service: UserService) { }

  container : Container = new Container();
  responseMessage: string = "Request Not Submitted";

  showSave: boolean = false;
  showButtons: boolean = true;
  inputEnabled:boolean = true;
  showSearch: boolean = true;
  showResults: boolean = false;
  name : string;

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }
  Search(){
    this.api.searchContainer(this.name).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message != null){
      this.responseMessage = res.Message;
      alert(this.responseMessage)}
      else{
          this.container.ContainerID = res.ContainerID;
          this.container.ConName = res.ConName;
          this.container.ConDescription = res.ConDescription;
      }
      
      this.showSearch = true;
      this.showResults = true;
      
    })

  }

  Cancel(){
    this.router.navigate(["container-management"])
  }

  Update(){
    this.showSave = true;
    this.inputEnabled = false;
    this.showButtons = false;
  }

  Delete(){
    this.api.deleteContainer(this.container.ContainerID).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["container-management"])
    })
  }

  Save(){
    this.api.updateContainer(this.container).subscribe( (res:any)=> {
      console.log(res);
      if(res.Message){
      this.responseMessage = res.Message;}
      alert(this.responseMessage)
      this.router.navigate(["container-management"])
    })
  }

  cancel(){
    this.showSave = false;
    this.inputEnabled = false;
    this.showButtons = true;
    
    this.showSearch = true;
    this.showResults = false;
  }

}
