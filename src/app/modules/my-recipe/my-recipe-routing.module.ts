import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRecipeComponent } from './my-recipe.component';

const routes: Routes = [{ path: '', component: MyRecipeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRecipeRoutingModule { }
