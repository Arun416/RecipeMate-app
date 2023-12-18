import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRecipeComponent } from './edit-recipe.component';
import { AuthGuard } from 'src/app/services/auth-guard-service/auth.guard';

const routes: Routes = [{ path: '', component: EditRecipeComponent ,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRecipeRoutingModule { }
