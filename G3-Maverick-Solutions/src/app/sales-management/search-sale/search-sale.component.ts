import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Sale} from '../sale';
import {Payment} from '../payment';
import {PaymentType} from '../payment-type';
import {ProductSale} from '../product-sale';
import {SaleDetails} from '../sale-details';
import {SalesService} from '../sales.service';
import {ProductDetails} from 'src/app/customer-order-management/product-details';

@Component({
  selector: 'app-search-sale',
  templateUrl: './search-sale.component.html',
  styleUrls: ['./search-sale.component.scss']
})
export class SearchSaleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

}
