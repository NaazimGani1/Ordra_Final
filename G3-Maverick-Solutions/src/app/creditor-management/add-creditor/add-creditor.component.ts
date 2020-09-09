import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/login-subsystem/service/user.service';
import { CreditorService } from '../creditor.service';
import { Creditor } from '../Models/creditor';
import { Supplier} from '../Models/supplier';


@Component({
  selector: 'app-add-creditor',
  templateUrl: './add-creditor.component.html',
  styleUrls: ['./add-creditor.component.scss']
})
export class AddCreditorComponent implements OnInit {
  
  dataSaved = false;
  creditorForm : any;
  provinceIDUpdate = null;
  message = null;
  
  dateVal = new Date();

  constructor( private creditorService: CreditorService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { };

  creditor : Creditor = new Creditor();
  supplier: Supplier = new Supplier();
  responseMessage: string = "Request Not Submitted";

  showSave: boolean = false;
  showButtons: boolean = true;
  inputEnabled:boolean = true;
  showSearch: boolean = true;
  showResults: boolean = false;
  name : string;
  id: number;

  ngOnInit(): void {
    this.creditorForm = this.formBuilder.group({
     ProvName: ['', [Validators.required]],
   }) 
 }

 onLogout() {
  localStorage.removeItem('token');
  this.router.navigate(['/user/login']);
}

onHome() {
  this.router.navigate(['/home']);
}

 gotoCreditorManagement()
  {
    this.router.navigate(['creditor-management']);
  }

  Save()
{
  this.dataSaved = false;
  const creditor = this.creditorForm.value;
  this.addCreditor();
}

searchSupplier(name: string)
{
  this.creditorService.searchSupplier(this.name).subscribe( (res: any) =>
    {
      console.log(res);
      if (res.Message != null)
      {
        this.responseMessage = res.Message;
        alert(this.responseMessage)

      }
      else 
      { 
        
        this.supplier.SupName = res.SupName;
        this.supplier.SupCell = res.SupCell;
        this.supplier.SupEmail = res.SupEmail;
        this.supplier.SupplierID = res.SupplierID;
      }

      this.showSearch = true;
      this.showResults = true; 
    })
}

addCreditor( )
{
  this.creditorService.addCreditor(this.creditor).subscribe( (res:any)=> 
  {
    console.log(res);
    if(res.Message)
    {
      this.responseMessage = res.Message;
    }
    alert(this.responseMessage)
    this.router.navigate(["creditor-management"])
  })


  /* if (this.provinceIDUpdate == null)
  {
    this.provinceService.addProvince(province).subscribe(
      () => {
        this.dataSaved = true;
        this.provinceIDUpdate = null;
      }
    );
  }
  else
  {
    province.ProvinceID = this.provinceIDUpdate;
    this.provinceService.updateProvince(province).subscribe(
      () => {
        this.dataSaved = true;
        this.provinceIDUpdate = null;
      }
    );
  } */
}

cancel(){
  this.router.navigate(["gps-management"])
}


}
