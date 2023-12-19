import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipes } from 'src/app/helpers/models/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  token_ID:any = localStorage.getItem('auth');
  constructor(private http:HttpClient) { }

  getCatgories(){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.get('http://localhost:3000/api/category/',{headers: header});
  }

  getHomeCatgories(){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
    })
    return this.http.get('http://localhost:3000/api/category/home',{headers: header});
  }

  getHomeCategory(catName:any){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
    })
    return  this.http.get('http://localhost:3000/api/recipe/home',{ params: {cat:catName},headers: header})
  }

  getSelectedCategory(catName:string){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return  this.http.get('http://localhost:3000/api/recipe/',{ params: {cat:catName},headers: header})
  }

  getRecipes(page:any,limit:any,column:any,sortType:any,searchTerm:any):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("sortField",column);
    queryParams = queryParams.append("sortOrder",sortType);
    queryParams = queryParams.append("search",searchTerm);
    
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
   /*  let queryParams = new HttpParams();
    queryParams = queryParams.append("search",searchterm); */
    return this.http.get<Recipes>('http://localhost:3000/api/recipe',{params:queryParams,headers: header});
  }

  getSuggestRecipes(page:any,limit:any,column:any,sortType:any,searchTerm:any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("sortField",column);
    queryParams = queryParams.append("sortOrder",sortType);
    queryParams = queryParams.append("search",searchTerm);
    
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.get('http://localhost:3000/api/recipe/home',{params:queryParams, headers: header});
  }

  getMyRecipes(currentUserRecipes:any) {
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.get('http://localhost:3000/api/recipe/',{ params: {user:currentUserRecipes},headers:header,})
  }


  createRecipes(formData:any){
    const header = new HttpHeaders({
      "Authorization": "Bearer "+this.token_ID,
    })
    return this.http.post('http://localhost:3000/api/recipe/new',formData,{headers: header})
  }

  editRecipes(formData:any,recipeId:any){
    const header = new HttpHeaders({
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.patch('http://localhost:3000/api/recipe/edit/'+recipeId,formData,{ headers: header});
  }

  viewRecipe(id:any){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.get(`http://localhost:3000/api/recipe/${id}`,{headers: header});
  }

  deleteRecipes(recipeID:string){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.delete('http://localhost:3000/api/recipe/delete/'+recipeID,{headers: header});
  }
}
