import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject  } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: '' 
  };

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/login');
    }
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        if (res.token)
        {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
        this.toastr.success('Successful Login', 'Welcome User :)');
        }
        if (res.message) 
        {
          console.log(res);
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        }
    });
  }

}
