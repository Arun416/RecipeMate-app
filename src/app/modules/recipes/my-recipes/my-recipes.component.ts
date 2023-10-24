import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit{
savedRecipes:any;
constructor(private recipeService:RecipeService, private spinner: NgxSpinnerService,){}

ngOnInit():void{
  this.getMyRecipes()
}



getMyRecipes(){
  let user:any
  user = JSON.parse(localStorage.getItem('currentUser')|| '')
  this.spinner.show();
  this.recipeService.getMyRecipes(user.username).subscribe((res:any)=>{
    console.log(res);
    this.savedRecipes = res.data;
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  })
}

}
