import { Component, OnInit } from '@angular/core';
import { AreaserviceService } from '../services/areaservice.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { Area } from '../model/area.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-searcharea',
  templateUrl: './searcharea.component.html',
  styleUrls: ['./searcharea.component.scss']
})
export class SearchareaComponent implements OnInit {
  AreaForm: FormGroup;

  constructor(private formBuilder: FormBuilder,public service: AreaserviceService,private router: Router) { }

  ngOnInit(){
    this.resetForm();
    this.refreshList();
  }

  refreshList() {
    this.service.getAreas().then(res => this.service.areaList = res as Area[]);
  }

  resetForm() {
    this.AreaForm = this.formBuilder.group({
      ArName: ['', Validators.required],
      ProvinceID: [0, Validators.required],
      AreaStatusID: [0, Validators.required],
  });
  }

    // convenience getter for easy access to form fields
    get f() { return this.AreaForm.controls; }

  selectProvince(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.service.areaData.ProvinceID = 0;
    } else {
      this.service.areaData.ProvinceID = this.service.areaList[ctrl.selectedIndex - 1].ProvinceID;
    }
  }

  selectAreaStatus(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.service.areaData.AreaStatusID = 0;
    } else {
      this.service.areaData.AreaStatusID = this.service.areaList[ctrl.selectedIndex - 1].AreaStatusID;
    }
  }

  submitSearch( obj: Area) {
    this.service.areaData = obj;
    }
  
}
