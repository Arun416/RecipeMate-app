import { NgModule } from "@angular/core";
import { MyRecipesComponent } from "./my-recipes/my-recipes.component";
import { RouterModule, Routes } from "@angular/router";
import { RecipeService } from "../../services/recipe-service/recipe.service";
import { CommonModule } from "@angular/common";
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider';
import { MatMenuModule} from '@angular/material/menu';

const routes:Routes = [
    {path:'' , component:MyRecipesComponent}
]

@NgModule({
    declarations:[MyRecipesComponent],
    imports:[CommonModule,
        RouterModule.forChild(routes)
        ,MatButtonModule,MatCardModule,MatIconModule,
        MatDividerModule,MatMenuModule
    ],
    exports:[MyRecipesComponent],
    providers:[RecipeService]
})

export class MyRecipesModule {}