import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe-service/recipe.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit{
savedRecipes:any;
constructor(private recipeService:RecipeService, 
  private spinner: NgxSpinnerService,
  private router:Router,private toastr: ToastrService,){}

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
   
      this.spinner.hide();
    
  })
}

deleteRecipe(recipeId:string){
  this.recipeService.deleteRecipes(recipeId).subscribe(res=>{
    console.log(res);
    
    this.toastr.success('Recipe deleted Successfully!', 'Success',{
      timeOut: 2000,
    });
  })
}

onSelectRecipe(recipeId:any){
  this.router.navigate(['/view-recipes/'+recipeId]);
}

onEditRecipe(recipeId:string){
  this.router.navigate(['/edit/'+recipeId]);
}


preventClick(event: MouseEvent){
  event.preventDefault();
}
}
