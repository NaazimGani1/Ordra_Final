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


import { SearchPaymentComponent } from './creditor-management/creditor-payment/search-payment/search-payment.component';
import { PlaceSupplierOrderComponent } from './supplier-order-management/place-supplier-order/place-supplier-order.component';

    

    //---Reporting Subsystem Imports---//
    import { CreditorReportComponent } from './reporting-management/creditor-report/creditor-report.component';
    import { CustomerOrderReportComponent } from './reporting-management/customer-order-report/customer-order-report.component';
    import { SupplierOrderReportComponent } from './reporting-management/supplier-order-report/supplier-order-report.component';
    import { MarkedOffProductReportComponent } from './reporting-management/marked-off-product-report/marked-off-product-report.component';
    import { ProductReportComponent } from './reporting-management/product-report/product-report.component';
    import { DonationReportComponent } from './reporting-management/donation-report/donation-report.component';
    import { SalesReportComponent } from './reporting-management/sales-report/sales-report.component';

    //---Donation Subsystem Imports---//
    import { CreateDonationComponent } from './donation-management/create-donation/create-donation.component';
    import { DonatedProductComponent } from './donation-management/donated-product/donated-product.component';
    import { SearchDonationComponent } from './donation-management/search-donation/search-donation.component';
    //import { SearchedDonationDetailsComponent } from './donation-management/searched-donation-details/searched-donation-details.component';
    
     //-----Province subsytem Imports----//
     import { AddProvinceComponent } from './gps-management/add-province/add-province.component';
     import { SearchProvinceComponent } from './gps-management/search-province/search-province.component';
     
    //-----Creditor subsytem Imports----//
    import { AddCreditorComponent } from './creditor-management/add-creditor/add-creditor.component';
    import { SearchCreditorComponent } from './creditor-management/search-creditor/search-creditor.component';
 
     //----Supplier Subsystem Imports----//
     import { AddSupplierComponent} from './add-supplier/add-supplier.component';
     import { ViewSupplierComponent} from './view-supplier/view-supplier.component';
 
     //---Manager Subsystem Imports---//
     import {CreateManagerComponent} from './create-manager/create-manager.component';
     import { SearchManagerComponent} from './view-manager/view-manager.component';
 
     //---Customer Order Subsystem Imports---//
     import {PlaceOrderComponent} from './place-order/place-order.component';
     import {ViewOrderComponent} from './view-order/view-order.component';
     import {SendNotificationComponent} from './send-notification/send-notification.component';

 //---Container Subsystem Imports---//
 import { CreateContainerComponent } from './create-container/create-container.component';
 import { SearchContainerComponent } from './search-container/search-container.component';

 //---Donation Recipient Subsystem Imports---//
 import { AddDonationRecipientComponent } from './donation-management/donation-recipient/add-donation-recipient/add-donation-recipient.component';
 import { SearchDonationRecipientComponent } from './donation-management/donation-recipient/search-donation-recipient/search-donation-recipient.component';

 //---Product Category Subsystem Imports---//
 import { AddProductCategoryComponent } from './product-management/product-category/add-product-category/add-product-category.component';
 import { SearchProductCategoryComponent } from './product-management/product-category/search-product-category/search-product-category.component';

 //---Product Subsystem Imports---//
 import { AddProductComponent } from './product-management/product/add-product/add-product.component';
 import { SearchProductComponent } from './product-management/product/search-product/search-product.component';
 import { SearchedProductDetailsComponent } from './product-management/product/searched-product-details/searched-product-details.component';
 import { StockTakeComponent } from './product-management/product/stock-take/stock-take.component';
 import { AddVatComponent } from './product-management/vat/add-vat/add-vat.component';
 import { UpdateVatComponent } from './product-management/vat/update-vat/update-vat.component';
import { SearchSupplierOrderComponent } from './supplier-order-management/search-supplier-order/search-supplier-order.component';
import { AddPaymentComponent } from './creditor-management/add-payment/add-payment.component';


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
        path: 'place-supplier-order',
        component: PlaceSupplierOrderComponent,
    },
    {
        path: 'search-supplier-order',
        component: SearchSupplierOrderComponent,
    },
    {
    path: 'add-payment',
        component: AddPaymentComponent,
    },
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

    //----Supplier Subsystem Routing---//

    {
        path: 'add-supplier',
        component: AddSupplierComponent,
    },

    {
        path: 'view-supplier',
        component: ViewSupplierComponent,
    },

    //----Manager Subsystem Routing---//
    {
        path: 'create-manager',
        component: CreateManagerComponent,
    },

    {
        path: 'view-manager',
        component: SearchManagerComponent,
    },


    //---Customer Order Subsytem Routing---//
    {
        path:'place-order',
        component: PlaceOrderComponent,
    
    },


    {
        path: 'view-order',
        component: ViewOrderComponent,
    },

    {
        path: 'send-notification',
        component: SendNotificationComponent,
    },

        
        {
            path: 'create-location',
            component: CreateLocationComponent,
        },
        {
            path: 'search-location',
            component: SearchLocationComponent,
        },
        {
            path: 'search-payment',
            component: SearchPaymentComponent,
        },
        


        ///---Province Subsystem Routing---//
        { path: 'add-province', component: AddProvinceComponent },
        { path: 'search-province', component: SearchProvinceComponent },
       
        //---Creditor Subsystem Routing---//
        { path: 'add-creditor', component: AddCreditorComponent },
        { path: 'search-creditor', component: SearchCreditorComponent },
    
        //---reporting Subsystem Routing---//
        { path: 'creditors-report', component: CreditorReportComponent},
        { path: 'customer-report', component: CustomerOrderReportComponent },
        { path: 'supplier-report', component: SupplierOrderReportComponent },
        { path: 'markedoff-product-report', component: MarkedOffProductReportComponent},
        { path: 'product-report', component: ProductReportComponent },
        { path: 'donation-report', component: DonationReportComponent },
        { path: 'sales-report', component: SalesReportComponent },
       
        //---Donation Subsystem Routing---//
        { path: 'create-donation', component: CreateDonationComponent },
        { path: 'search-donated-product', component: SearchCreditorComponent},
        { path: 'search-donation', component: SearchDonationComponent },
        //{ path: 'searched-donation-details', component: SearchedDonationDetailsComponent},
  
         //----Container Subsystem Routing---//
        {
            path: 'create-container',
            component: CreateContainerComponent,
        },

        {
            path: 'search-container',
            component: SearchContainerComponent,
        },
        //----Donation Recipient Subsystem Routing---//
        {
            path: 'add-donation-recipient',
            component: AddDonationRecipientComponent,
        },

        {
            path: 'search-donation-recipient',
            component: SearchDonationRecipientComponent,
        },

         //----Product Category Subsystem Routing---//
         {
            path: 'add-product-category',
            component: AddProductCategoryComponent,
        },

        {
            path: 'search-product-category',
            component: SearchProductCategoryComponent,
        },

        //----Product Subsystem Routing---//
        {
            path: 'add-product',
            component: AddProductComponent,
        },

        {
            path: 'search-product',
            component: SearchProductComponent,
        },

        {
            path: 'searched-product-details',
            component: SearchedProductDetailsComponent,
        },

        {
            path: 'stock-take',
            component: StockTakeComponent,
        },

        {
            path: 'add-vat',
            component: AddVatComponent,
        },

        {
            path: 'update-vat',
            component: UpdateVatComponent,
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