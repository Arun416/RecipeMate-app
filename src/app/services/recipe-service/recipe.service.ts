import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  getCatgories(){
    return this.http.get('http://localhost:3000/api/category/');
  }

  getSelectedCategory(catName:string){
    return  this.http.get('http://localhost:3000/api/recipe/',{ params: {cat:catName}})
  }

  getRecipes():Observable<any>{
    return this.http.get('http://localhost:3000/api/recipe/');
  }

  getTrendRecipes(){
    return this.http.get('http://localhost:3000/api/trend/recipe');
  }

  getMyRecipes(currentUserRecipes:any) {

    return this.http.get('http://localhost:3000/api/recipe/',{ params: {user:currentUserRecipes}})
  }


  createRecipes(formData:any){
    /* let headers = new Headers();
    const token = localStorage.getItem('auth')||
    headers.append("Authorization",token); */
    return this.http.post('http://localhost:3000/api/recipe/new',formData)
  }

  editRecipes(formData:any,recipeId:string){
    return this.http.patch('http://localhost:3000/api/recipe/edit/'+recipeId,formData);
  }

  viewRecipe(id:any){
    return this.http.get(`http://localhost:3000/api/recipe/${id}`);
  }

  deleteRecipes(recipeID:string){
    return this.http.delete('http://localhost:3000/api/recipe/delete/'+recipeID);
  }
}
