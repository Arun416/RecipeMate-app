import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard-service/auth.guard';

const routes: Routes = [
  
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/core/core.module').then((m) => m.CoreModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./modules/create-recipe/create-recipes.module').then((m) => m.CreateRecipeModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./modules/edit-recipe/edit-recipes.module').then((m) => m.EditRecipeModule),
    canActivate:[AuthGuard]
  },
  {
    path:'view-recipes/:id',
    loadChildren: () => import('./modules/recipe-view/recipe-view.module').then((m) => m.RecipeViewModule),
    canActivate:[AuthGuard]
  },
  {
    path:'my-recipes',
    loadChildren: () => import('./modules/myrecipes/myrecipes.module').then((m) => m.MyRecipesModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRouting {}
