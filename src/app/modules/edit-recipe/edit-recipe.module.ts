import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRecipeRoutingModule } from './edit-recipe-routing.module';
import { EditRecipeComponent } from './edit-recipe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    EditRecipeComponent
  ],
  imports: [
    CommonModule,
    EditRecipeRoutingModule,
    ReactiveFormsModule,FormsModule,
    MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule,MatSelectModule,
    MatIconModule
  ]
})
export class EditRecipeModule { }
