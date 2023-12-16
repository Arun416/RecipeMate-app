import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRecipeRoutingModule } from './create-recipe-routing.module';
import { CreateRecipeComponent } from './create-recipe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    CreateRecipeComponent
  ],
  imports: [
    CommonModule,
    CreateRecipeRoutingModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,MatButtonModule,MatCardModule,MatInputModule,
    MatFormFieldModule,MatSelectModule,MatIconModule
  ],
})
export class CreateRecipeModule { }
