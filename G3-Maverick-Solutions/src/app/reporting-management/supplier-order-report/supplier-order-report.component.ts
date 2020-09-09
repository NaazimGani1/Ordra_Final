import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate} from '@angular/common';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { UserService } from 'src/app/login-subsystem/service/user.service';


//import * as jsPDF from 'jspdf';
//import {jsPDF } from 'jspdf'
//import 'jspdf-autotable';
//import { Chart } from 'chart.js';
//import { ThrowStmt } from '@angular/compiler';
//import { max } from 'rxjs/operators';

@Component({
  selector: 'app-supplier-order-report',
  templateUrl: './supplier-order-report.component.html',
  styleUrls: ['./supplier-order-report.component.scss']
})
export class SupplierOrderReportComponent implements OnInit {

  dateVal = new Date();

  constructor(private reportService: ReportService, private router: Router, private userService: UserService) { }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }


  ngOnInit(): void {
  }

}
