import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipesComponent } from './create-recipes/create-recipes.component';

const routes: Routes = [
    {
      path: '',
      component: CreateRecipesComponent,
    },
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class CreateRecipeRoutingModule {}