import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule} from '@angular/material/icon';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from '../../services/authService/auth.service';


@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, 
            AuthRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            MatButtonModule,
            MatCardModule,
            MatInputModule,
            MatFormFieldModule,
            MatProgressSpinnerModule,
            MatIconModule],
  exports: [RouterModule, RegisterComponent, LoginComponent],
  providers: [AuthService],
})
export class AuthModule {}
