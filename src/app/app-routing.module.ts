import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './services/auth-guard-service/auth.guard';

const routes: Routes = [
   {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
   },
   {
    path:'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
   },
   {
    path: 'login',
    loadChildren: () => import('./modules/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/auth/register/register.module').then((m) => m.RegisterModule),
  },
   { path: 'create', loadChildren: () => import('./modules/create-recipe/create-recipe.module').then(m => m.CreateRecipeModule) },
   { path: 'edit/:id', loadChildren: () => import('./modules/edit-recipe/edit-recipe.module').then(m => m.EditRecipeModule) },
   { path: 'my-recipe', loadChildren: () => import('./modules/my-recipe/my-recipe.module').then(m => m.MyRecipeModule) },
   { path: 'view-recipe/:id', loadChildren: () => import('./modules/view-recipe/view-recipe.module').then(m => m.ViewRecipeModule) },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}
