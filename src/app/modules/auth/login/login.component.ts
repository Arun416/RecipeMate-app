import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormroup!:FormGroup;
  submitted:boolean=false;
  private formSubmitAttempt!: boolean;
  
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
    ){}


  ngOnInit(){
    this.loginFormroup = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      rememberMe:[false]
    })
  }

  OnSubmitLogin(formData: any) {
    this.submitted = true;
    if(this.loginFormroup.invalid){
      return;
    }
    this.authService.login(formData).subscribe({
      next: (resp:any)=>{
          console.log(resp);
          this.router.navigate(['/home']);
          this.toastr.success('Successfully Loginned!', 'Success',{
            timeOut: 2000,
          });
          this.submitted = false;
      },
      error:err=>{
        alert(err.message)
      }
    })
    
  }
}
