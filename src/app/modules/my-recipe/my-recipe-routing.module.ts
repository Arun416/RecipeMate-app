import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRecipeComponent } from './my-recipe.component';
import { AuthGuard } from 'src/app/services/auth-guard-service/auth.guard';

const routes: Routes = [{ path: '', component: MyRecipeComponent ,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRecipeRoutingModule { }
