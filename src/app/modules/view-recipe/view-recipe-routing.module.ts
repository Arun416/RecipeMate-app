import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRecipeComponent } from './view-recipe.component';

const routes: Routes = [{ path: '', component: ViewRecipeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRecipeRoutingModule { }
