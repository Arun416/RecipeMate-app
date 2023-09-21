import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RecipesListComponent,
  },
];

@NgModule({
  declarations: [RecipesListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule, RecipesListComponent],
})
export class RecipesModule {}
