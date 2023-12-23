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
  sortOrder: 'asc' | 'desc' = 'asc';
  searchTerm:string = "";
  public isItemsPerPage = 20;
  public pagination:number = 1;
  constructor(private recipeService:RecipeService, 
    private spinner: NgxSpinnerService,
    private router:Router,
    private toastr: ToastrService,
    private authService:AuthService){}
  
  ngOnInit():void{
    this.getAllRecipes();
    this.getMyRecipes();
  }

  getAllRecipes(){
    const user:any = this.authService.getCurrentUser();
    this.recipeService.getRecipes(
      this.pagination,
      this.isItemsPerPage,
      'recipe_name',
      this.sortOrder,
      this.searchTerm,user?.source?._value.token).subscribe(res=>{
    })
  }
  
  
  getMyRecipes(){
    this.spinner.show();
      const user:any = this.authService.getCurrentUser();      
      const decoded:any = jwtDecode<JwtPayload>(user.source._value.token);
      this.recipeService.getMyRecipes(decoded.userData.username).subscribe((res:any)=>{
        this.savedRecipes = res.data.recipeList;
          this.spinner.hide();

      })
  }
  
  deleteRecipe(recipeId:string){
    this.recipeService.deleteRecipes(recipeId).subscribe(res=>{
      this.getMyRecipes();
      this.toastr.success('Recipe deleted Successfully!', 'Success',{
        timeOut: 2000,
      });
  
      this.getAllRecipes();
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
