import {NgModule} from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { EditRecipesComponent } from './edit-recipes/edit-recipes.component';

const routes:Routes = [
    {path:'',component: EditRecipesComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
})

export class EditRecipesRoutingModule {}