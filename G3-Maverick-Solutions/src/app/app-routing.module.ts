import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
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

        //-----Login Subsystem Imports----//
    import { UserComponent } from './login-subsystem/user/user.component';
    import { RegisterComponent } from './login-subsystem/user/register/register.component';
    import { LoginComponent } from './login-subsystem/user/login/login.component';
    import { CreateLocationComponent } from './location/create-location/create-location.component';
    import { SearchLocationComponent } from './location/search-location/search-location.component';
    import { ResetpasswordComponent} from './login-subsystem/user/resetpassword/resetpassword.component';
    import { HomeComponent } from './home/home.component';
    import { AuthGuard } from './login-subsystem/authentication/auth.guard';


    //-----gps subsystem Imports----//
    import { AreadetailsComponent} from './gps-management/areadetails/areadetails.component';
    import { UpdateareaComponent} from './gps-management/updatearea/updatearea.component';
    import { CreateareaComponent} from './gps-management/createarea/createarea.component';
    import { SearchareaComponent} from './gps-management/searcharea/searcharea.component';

     //-----employee subsystem Imports----//
     import { CreateemployeeComponent} from './employee-management/createemployee/createemployee.component';
     import { SearchemployeeComponent} from './employee-management/searchemployee/searchemployee.component';
     import { UpdateemployeeComponent} from './employee-management/updateemployee/updateemployee.component';


    //-----Customer subsytem Imports----//
    import { AddCustomerComponent} from './add-customer/add-customer.component';
    import { ViewCustomerComponent } from './view-customer/view-customer.component';




    const routes: Routes = [
        //Routes For Users
        { path : '', redirectTo: '/user/login', pathMatch : 'full'},
        {
            path: 'user', component: UserComponent,    
            children: [
                { path: 'register', component: RegisterComponent },
                { path: 'login', component: LoginComponent },
                { path: 'resetpassword', component: ResetpasswordComponent}, ]
        },
       // GPS Routes
       { path: 'areadetails', component: AreadetailsComponent},
       { path: 'createarea', component: CreateareaComponent},
       { path: 'searcharea', component: SearchareaComponent},
       { path: 'updatearea', component: UpdateareaComponent},

       // Employee Routes
       { path: 'createemployee', component: CreateemployeeComponent},
       { path: 'updateemployee', component: UpdateemployeeComponent},
       { path: 'searchemployee', component: SearchemployeeComponent},
       //
       {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},


        {
            path: 'employee-management',
            component: EmployeeManagementComponent,
        },
        {
            path: 'container-management',
            component: ContainerManagementComponent,
        },
        {
            path: 'manager-management',
            component: ManagerManagementComponent,
        },
        {
            path: 'gps-management',
            component: GPSManagementComponent,
        },
        {
            path: 'sales-management',
            component: SalesManagementComponent,
        },
        {
            path: 'customer-management',
            component: CustomerManagementComponent,
        },
        {
            path: 'customer-order-management',
            component: CustomerOrderManagementComponent,
        },
        {
            path: 'supplier-management',
            component: SupplierManagementComponent,
        },
        {
            path: 'supplier-order-management',
            component: SupplierOrderManagementComponent,
        },
        {
            path: 'product-management',
            component: ProductManagementComponent,
        },
        {
            path: 'donation-management',
            component: DonationManagementComponent,
        },
        {
            path: 'creditor-management',
            component: CreditorManagementComponent,
        },
        {
            path: 'reporting-management',
            component: ReportingManagementComponent,
        },

        //---Customer Subsystem Routing---//
        {
            path: 'add-customer',
            component: AddCustomerComponent,
        },

        {
            path: 'view-customer',
            component: ViewCustomerComponent,
        },
        
        {
            path: 'create-location',
            component: CreateLocationComponent,
        },
        {
            path: 'search-location',
            component: SearchLocationComponent,
        },
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }