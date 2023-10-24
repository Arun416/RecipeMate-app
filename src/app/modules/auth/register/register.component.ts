import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control?.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpFormGroup!:FormGroup;
  submitted:boolean=false;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder,private authService:AuthService){}

  ngOnInit(): void {
    this.signUpFormGroup = this.fb.group({
      username: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required]]
    })
  }

  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }
// getting the form control elements
get password(): AbstractControl {
  return this.signUpFormGroup.controls['password'];
}

get confirm_password(): AbstractControl {
  return this.signUpFormGroup.controls['confirmPassword'];
}


onSubmitSignup(formData: any){
    this.submitted = true;
    if(!this.signUpFormGroup.valid){
      return;
    }
    console.log(formData);
    this.authService.signup(formData).subscribe({
      next: (resp:any)=>{
          console.log(resp);
          window.alert("success");
          
      } })
  }
}
