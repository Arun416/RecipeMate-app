import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.css']
})
export class MyRecipeComponent implements OnInit{
  savedRecipes:any;
  constructor(private recipeService:RecipeService, 
    private spinner: NgxSpinnerService,
    private router:Router,
    private toastr: ToastrService,
    private authService:AuthService){}
  
  ngOnInit():void{
    this.getMyRecipes()
  }
  
  
  
  getMyRecipes(){
    const user:any = this.authService.getCurrentUser();
    const decoded:any = jwtDecode<JwtPayload>(user?.source?._value.token);
    this.spinner.show();
    this.recipeService.getMyRecipes(decoded.userData.username).subscribe((res:any)=>{
      console.log(res);
      this.savedRecipes = res.data.recipeList;
     
        this.spinner.hide();
      
    })
  }
  
  deleteRecipe(recipeId:string){
    this.recipeService.deleteRecipes(recipeId).subscribe(res=>{
      console.log(res);
      this.getMyRecipes();
      this.toastr.success('Recipe deleted Successfully!', 'Success',{
        timeOut: 2000,
      });
  
      
    })
  }
  
  onSelectRecipe(recipeId:any){
    this.router.navigateByUrl('/view-recipes/'+recipeId);
  }
  
  onEditRecipe(recipeId:string){
    this.router.navigateByUrl('/edit/'+recipeId);
  }
  
  
  preventClick(event: MouseEvent){
    event.preventDefault();
  }
}
