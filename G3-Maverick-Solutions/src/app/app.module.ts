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

