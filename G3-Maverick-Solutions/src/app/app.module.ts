import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*run npm i ngx-toastr */
import { ToastrModule } from 'ngx-toastr';
/*run npm i @angular/material - npm i @material/dialog*/
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { ContainerManagementComponent } from './container-management/container-management.component';
import { ManagerManagementComponent } from './manager-management/manager-management.component';
import { GPSManagementComponent } from './gps-management/gps-management.component';
import { SalesManagementComponent } from './sales-management/sales-management.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { CustomerOrderManagementComponent } from './customer-order-management/customer-order-management.component';
import { SupplierManagementComponent } from './supplier-management/supplier-management.component';
import { SupplierOrderManagementComponent } from './supplier-order-management/supplier-order-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { DonationManagementComponent } from './donation-management/donation-management.component';
import { CreditorManagementComponent } from './creditor-management/creditor-management.component';
import { ReportingManagementComponent } from './reporting-management/reporting-management.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './login-subsystem/user/user.component';
import { RegisterComponent } from './login-subsystem/user/register/register.component';
import { LoginComponent } from './login-subsystem/user/login/login.component'
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

import { LocationComponent } from './location/location.component';
import { CreateLocationComponent } from './location/create-location/create-location.component';
import { SearchLocationComponent } from './location/search-location/search-location.component';
import { ResetpasswordComponent } from './login-subsystem/user/resetpassword/resetpassword.component';
import { CreateareaComponent } from './gps-management/createarea/createarea.component';
import { SearchareaComponent } from './gps-management/searcharea/searcharea.component';
import { AreadetailsComponent } from './gps-management/areadetails/areadetails.component';
import { UpdateareaComponent } from './gps-management/updatearea/updatearea.component';
import { CreateemployeeComponent } from './employee-management/createemployee/createemployee.component';
import { UpdateemployeeComponent } from './employee-management/updateemployee/updateemployee.component';
import { SearchemployeeComponent } from './employee-management/searchemployee/searchemployee.component';

//login authentication
import { AuthInterceptor } from './login-subsystem/authentication/auth.interceptor';
import { UserService } from './login-subsystem/service/user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CreateManagerComponent } from './create-manager/create-manager.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { SearchManagerComponent } from './view-manager/view-manager.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { MakeSaleComponent } from './sales-management/make-sale/make-sale.component';
import { SearchSaleComponent } from './sales-management/search-sale/search-sale.component';
import { CreditorPaymentComponent } from './creditor-management/creditor-payment/creditor-payment.component';
import { SearchPaymentComponent } from './creditor-management/creditor-payment/search-payment/search-payment.component';


import { AddProvinceComponent } from './gps-management/add-province/add-province.component';
import { SearchProvinceComponent } from './gps-management/search-province/search-province.component';
import { CreditorReportComponent } from './reporting-management/creditor-report/creditor-report.component';
import { CustomerOrderReportComponent } from './reporting-management/customer-order-report/customer-order-report.component';
import { SupplierOrderReportComponent } from './reporting-management/supplier-order-report/supplier-order-report.component';
import { MarkedOffProductReportComponent } from './reporting-management/marked-off-product-report/marked-off-product-report.component';
import { SalesReportComponent } from './reporting-management/sales-report/sales-report.component';
import { ProductReportComponent } from './reporting-management/product-report/product-report.component';
import { DonationReportComponent } from './reporting-management/donation-report/donation-report.component';
import { AddCreditorComponent } from './creditor-management/add-creditor/add-creditor.component';
import { SearchCreditorComponent } from './creditor-management/search-creditor/search-creditor.component';
import { CreateDonationComponent } from './donation-management/create-donation/create-donation.component';
import { SearchDonationComponent } from './donation-management/search-donation/search-donation.component';
import { DonatedProductComponent } from './donation-management/donated-product/donated-product.component';

import { PlaceSupplierOrderComponent } from './supplier-order-management/place-supplier-order/place-supplier-order.component';
import { CreateContainerComponent } from './create-container/create-container.component';
import { SearchContainerComponent } from './search-container/search-container.component';
import { DonationRecipientComponent } from './donation-management/donation-recipient/donation-recipient.component';
import { AddDonationRecipientComponent } from './donation-management/donation-recipient/add-donation-recipient/add-donation-recipient.component';
import { SearchDonationRecipientComponent } from './donation-management/donation-recipient/search-donation-recipient/search-donation-recipient.component';
import { ProductComponent } from './product-management/product/product.component';
import { ProductCategoryComponent } from './product-management/product-category/product-category.component';
import { VatComponent } from './product-management/vat/vat.component';
import { AddVatComponent } from './product-management/vat/add-vat/add-vat.component';
import { UpdateVatComponent } from './product-management/vat/update-vat/update-vat.component';
import { AddProductCategoryComponent } from './product-management/product-category/add-product-category/add-product-category.component';
import { SearchProductCategoryComponent } from './product-management/product-category/search-product-category/search-product-category.component';
import { AddProductComponent } from './product-management/product/add-product/add-product.component';
import { SearchProductComponent } from './product-management/product/search-product/search-product.component';
import { SearchedProductDetailsComponent } from './product-management/product/searched-product-details/searched-product-details.component';
import { StockTakeComponent } from './product-management/product/stock-take/stock-take.component';
import { SearchSupplierOrderComponent } from './supplier-order-management/search-supplier-order/search-supplier-order.component';
import { AddPaymentComponent } from './creditor-management/add-payment/add-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeManagementComponent,
    ContainerManagementComponent,
    ManagerManagementComponent,
    GPSManagementComponent,
    SalesManagementComponent,
    CustomerManagementComponent,
    CustomerOrderManagementComponent,
    SupplierManagementComponent,
    SupplierOrderManagementComponent,
    ProductManagementComponent,
    DonationManagementComponent,
    CreditorManagementComponent,
    ReportingManagementComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    AddCustomerComponent,
    ViewCustomerComponent,
    LocationComponent,
    CreateLocationComponent,
    SearchLocationComponent,
    ResetpasswordComponent,
    CreateareaComponent,
    SearchareaComponent,
    AreadetailsComponent,
    UpdateareaComponent,
    CreateemployeeComponent,
    UpdateemployeeComponent,
    SearchemployeeComponent,
    NavbarComponent,
    HomeComponent,
    ForbiddenComponent,
    CreateManagerComponent,
    PlaceOrderComponent,
    SearchManagerComponent,
    SendNotificationComponent,
    ViewOrderComponent,
    MakeSaleComponent,
    SearchSaleComponent,
    CreditorPaymentComponent,
    SearchPaymentComponent,


    AddProvinceComponent,
    SearchProvinceComponent,
    CreditorReportComponent,
    CustomerOrderReportComponent,
    SupplierOrderReportComponent,
    MarkedOffProductReportComponent,
    SalesReportComponent,
    ProductReportComponent,
    DonationReportComponent,
    AddCreditorComponent,
    SearchCreditorComponent,
    CreateDonationComponent,
    SearchDonationComponent,
    DonatedProductComponent,


    PlaceSupplierOrderComponent,

    CreateContainerComponent,
    SearchContainerComponent,
    DonationRecipientComponent,
    AddDonationRecipientComponent,
    SearchDonationRecipientComponent,
    ProductComponent,
    ProductCategoryComponent,
    VatComponent,
    AddVatComponent,
    UpdateVatComponent,
    AddProductCategoryComponent,
    SearchProductCategoryComponent,
    AddProductComponent,
    SearchProductComponent,
    SearchedProductDetailsComponent,
    StockTakeComponent,
    SearchSupplierOrderComponent,
    AddPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule
  ],
  providers: [UserService, { provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

