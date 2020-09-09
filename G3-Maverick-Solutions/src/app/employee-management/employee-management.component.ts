import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-management/service/employee.service';
import { Employee} from '../employee-management/model/employee.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {
  title = 'ORDRA';
  dateVal = new Date();
  
  btnLabel: string;

  formModel = {
    EmployeeName: '',
    EmployeeSurname: '' 
  };

  location = true;
  variable = false;
  add = false;
  main = false;
  search = false;
  delete = false;
  searchdelete = false;

  formModel1 = {
    EmpName: '',
    EmpCellNo: '',
    EmpSurname: '',
    EmpEmail: '' ,
    EmpStartDate:'',
    EmpShiftsCompleted:''
  };

  formModel2 = {
    EmpName: '',
    EmpCellNo: '',
    EmpSurname: '',
    EmpEmail: '' ,
    EmpStartDate:'',
    EmpShiftsCompleted:''
  };

  formModel3 = {
    EmpNameS: '',
    EmpSurnameS: ''
  }


  constructor( public service: EmployeeService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(){
    this.btnLabel = 'Create Employee';
  }

  onHome() {
    this.router.navigate(['/home']);
  }



  submitEmployee(form: NgForm) {
    console.log(form);
      this.service.postEmployee(form.value).subscribe((res: any) => {
        console.log(res);
        if (res !='Error' && res !='Nothing')
        {
          console.log(res);
          this.location = true;
          this.variable = false;
          this.add = false;
          this.main = false;
          this.toastr.success('Success', 'Employee Recorded Modified :)');
        }
        else
        {
          console.log(res);
          this.toastr.error('Uh Oh ', 'Something Went Wrong. Please Try again');
        }
      });  
  }

  submitEmployeeDelete(form: NgForm) {
    console.log(form);
     this.service.deleteEmployee(form.value).subscribe((res: any) => {
       console.log(res);
       if (res =='NotFound')
       {
         console.log(res);
         this.toastr.error('Uh Oh ', 'Something Went Wrong. Please Try again');
       }
       else
       {
        console.log(res);
        this.location = true;
        this.variable = false;
        this.add = false;
        this.main = false;
        this.search = false;
        this.searchdelete = false;
        this.delete = false;
        this.toastr.success('Success', 'Employee Recorded Deleted :)');
       }
     });  
 }

  onSubmit(form: NgForm) {
    this.service.search(form.value).subscribe(
      (res: any) => {
        if(res =='NotFound')
        {
          console.log(res);
          this.location = false;
          this.variable = false;
          this.add = false;
          this.main = true;
          this.toastr.error('UH Oh', ' No Employee Found :( ');
        }
        else
        {
          this.service.empList = res as Employee[];
          console.log(this.service.empList);
          this.variable = true;
          this.main = false;
          this.toastr.success('Success', 'Employee Found :)');
        }
    });
  }

  onSubmitDelete(form: NgForm) {
    this.service.search(form.value).subscribe(
      (res: any) => {
        if(res =='NotFound')
        {
          console.log(res);
          this.location = false;
          this.variable = false;
          this.add = false;
          this.main = false;
          this.searchdelete = true;
          this.search = false;
          this.delete = false;
          this.toastr.error('UH Oh', ' No Employee Found :( ');
        }
        else
        {
          this.service.empList = res as Employee[];
          console.log(this.service.empList);
          this.location = false;
          this.variable = false;
          this.add = false;
          this.main = false;
          this.searchdelete = false;
          this.search = false;
          this.delete = true;
          this.toastr.success('Success', 'Employee Found :)');
        }
    });
  }

  clear()
  {
    window.location.reload()
  }

  Create()
  {
    this.location = false;
    this.variable = false;
    this.add = true;
    this.main = false;
    this.search = false;
  }

  Update()
  {
    this.location = false;
    this.variable = false;
    this.add = false;
    this.search = false;
    this.main = true;
  }

  Search()
  {
    this.location = false;
    this.variable = false;
    this.add = false;
    this.main = false;
    this.search = true;
  }

  Delete()
  {
    this.location = false;
    this.variable = false;
    this.add = false;
    this.search = false;
    this.main = false;
    this.delete = false;
    this.searchdelete = true;
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
