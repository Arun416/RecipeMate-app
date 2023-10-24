import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

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
    private router: Router){}


  ngOnInit(){
    this.loginFormroup = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      rememberMe:[false]
    })
  }

  OnSubmitLogin(formData: any) {
    this.submitted = true;
    this.spinner.show();
    if(this.loginFormroup.invalid){
      return;
    }
    console.log(formData);
    this.authService.login(formData).subscribe({
      next: (resp:any)=>{
          console.log(resp);
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
  
          this.router.navigate(['/home'])
      }
    })
    setTimeout(()=>this.submitted=== false,1000)
  }
}
