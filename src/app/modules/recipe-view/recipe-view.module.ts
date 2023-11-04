import { NgModule } from "@angular/core";
import { ViewRecipesComponent } from "./view-recipes/view-recipes.component";
import { RouterModule, Routes } from "@angular/router";
import { RecipeService } from "../../services/recipe-service/recipe.service";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule} from '@angular/material/card';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';


const routes:Routes = [
    {path:'',component:ViewRecipesComponent}
]

@NgModule({
    declarations:[ViewRecipesComponent],
    imports:[CommonModule,RouterModule.forChild(routes),
        MatTabsModule,MatCardModule,MatExpansionModule,
        MatTableModule,MatPaginatorModule],
    exports:[ViewRecipesComponent,RouterModule],
    providers:[RecipeService]
})

export class RecipeViewModule {}