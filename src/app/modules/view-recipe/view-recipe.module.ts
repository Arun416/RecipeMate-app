import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRecipeRoutingModule } from './view-recipe-routing.module';
import { ViewRecipeComponent } from './view-recipe.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    ViewRecipeComponent
  ],
  imports: [
    CommonModule,
    ViewRecipeRoutingModule,
    MatTabsModule,MatCardModule,MatExpansionModule,
    MatTableModule,MatPaginatorModule
  ]
})
export class ViewRecipeModule { }
