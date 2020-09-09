import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject  } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {



  constructor(public service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel1.reset();
  }

  onSubmit() {
    this.service.reset().subscribe(
      (res: any) => {
        if (res.success)
        {
        console.log(res);
        this.router.navigateByUrl('/login');
        this.toastr.success('Successful Reset', ' You may Login :)');
        }
        if (res.message) 
        {
          console.log(res);
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        }
    });
  }

}
