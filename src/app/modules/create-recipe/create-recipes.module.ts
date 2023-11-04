import { NgModule} from '@angular/core'
import { CreateRecipesComponent } from './create-recipes/create-recipes.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRecipeRoutingModule } from './create-recipes-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations:[CreateRecipesComponent],
    imports:[CommonModule,
             CreateRecipeRoutingModule,
             TabsModule.forRoot(),
             ReactiveFormsModule,
             FormsModule,MatButtonModule,MatCardModule,MatInputModule,
             MatFormFieldModule,MatSelectModule,MatIconModule],
    exports:[CreateRecipesComponent]
})

export class CreateRecipeModule {}