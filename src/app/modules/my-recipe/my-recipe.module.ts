import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRecipeRoutingModule } from './my-recipe-routing.module';
import { MyRecipeComponent } from './my-recipe.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MyRecipeComponent
  ],
  imports: [
    CommonModule,
    MyRecipeRoutingModule,
    MatButtonModule,MatCardModule,MatIconModule,
    MatDividerModule,MatMenuModule,
    SharedModule
  ]
})
export class MyRecipeModule { }
