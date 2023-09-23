import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { CreateRecipesComponent } from './create-recipes/create-recipes.component';
import { EditRecipesComponent } from './edit-recipes/edit-recipes.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: RecipesListComponent,
  },
  {
    path: 'view-recipes',
    component: ViewRecipesComponent,
  },
];

@NgModule({
  declarations: [
    RecipesListComponent,
    ViewRecipesComponent,
    CreateRecipesComponent,
    EditRecipesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot(),
    MatTabsModule,
    MatIconModule,
  ],
  exports: [
    RouterModule,
    RecipesListComponent,
    ViewRecipesComponent,
    MatTabsModule,
    MatIconModule,
  ],
})
export class RecipesModule {}
