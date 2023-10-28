import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { CreateRecipesComponent } from './create-recipes/create-recipes.component';
import { EditRecipesComponent } from './edit-recipes/edit-recipes.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatDividerModule} from '@angular/material/divider';

const routes: Routes = [
  {
    path:'',
    redirectTo:'view-recipes/:id',
    pathMatch:'full'
  },
  {
    path: 'view-recipes/:id',
    component: ViewRecipesComponent,
  },
  {
    path: 'my-recipes',
    component: MyRecipesComponent,
  },
  {
    path: 'create',
    component: CreateRecipesComponent,
  },
];

@NgModule({
  declarations: [
    RecipesListComponent,
    ViewRecipesComponent,
    CreateRecipesComponent,
    EditRecipesComponent,
    MyRecipesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot(),
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatDividerModule
  ],
  exports: [
    RouterModule,
    RecipesListComponent,
    ViewRecipesComponent,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule
  ],
})

export class RecipesModule {}
