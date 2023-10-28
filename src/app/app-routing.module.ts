import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/core/core.module').then((m) => m.CoreModule),
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'view-recipes',
    loadChildren: () => import('./modules/recipes/recipes.module').then((m) => m.RecipesModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRouting {}
