import { NgModule } from "@angular/core";
import { EditRecipesComponent } from "./edit-recipes/edit-recipes.component";
import { EditRecipesRoutingModule } from "./edit-recipes-routing.module";
import { ReactiveFormsModule ,FormsModule} from "@angular/forms";
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field'; 
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[EditRecipesComponent],
    imports:[EditRecipesRoutingModule,CommonModule,ReactiveFormsModule,FormsModule,
    MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule,MatSelectModule,
    MatIconModule
 ],
    exports:[EditRecipesComponent]
})

export class EditRecipeModule {}