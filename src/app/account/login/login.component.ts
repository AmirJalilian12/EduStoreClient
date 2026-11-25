import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AcountService } from '../account.service';
import { Login } from 'src/app/shared/Models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private returnUrl ='/';
  constructor(private bcService : BreadcrumbService ,private accountService : AcountService , private route : ActivatedRoute , private router : Router , private toast : ToastrService ) { }
  form = new FormGroup({
    phoneNumber : new FormControl('',[Validators.required , Validators.minLength(11),Validators.maxLength(11)]),
    password : new FormControl('',[Validators.required,Validators.minLength(5)])
  })
  ngOnInit(): void {
    this.bcService.set('@login','ورود به سایت'); 
    this.returnUrl = this.route.snapshot?.queryParamMap?.get('returnUrl') ?? '/';
  }
  onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const login = <Login>this.form.value;
    this.accountService.login(login).subscribe((response)=>{
      this.router.navigateByUrl(this.returnUrl);
      this.toast.success('شما با موفقیت وارد شدید');
    });
  }

}
