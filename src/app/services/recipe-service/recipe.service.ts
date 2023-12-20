import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipes } from 'src/app/helpers/models/recipes';
import { environment } from 'src/environment/environment';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  token_ID:any = localStorage.getItem('auth');
  constructor(private http:HttpClient,private authServ:AuthService) { }


  getAuthToken(){
    let user:any  = this.authServ.getCurrentUser();
    let jwt = user.source._value.token
    return jwt;
  }

  getCatgories(){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.getAuthToken()
    })
    return this.http.get(environment.baseURL+'category/',{headers: header});
  }

  getHomeCatgories(){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
    })
    return this.http.get(environment.baseURL+'category/home',{headers: header});
  }

  getHomeCategory(catName:any){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
    })
    return  this.http.get(environment.baseURL+'recipe/home',{ params: {cat:catName},headers: header})
  }

  getSelectedCategory(catName:string){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return  this.http.get(environment.baseURL+'recipe/',{ params: {cat:catName},headers: header})
  }

  getRecipes(page:any,limit:any,column:any,sortType:any,searchTerm:any,token:string):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("sortField",column);
    queryParams = queryParams.append("sortOrder",sortType);
    queryParams = queryParams.append("search",searchTerm);
    
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+token
    })
   /*  let queryParams = new HttpParams();
    queryParams = queryParams.append("search",searchterm); */
    return this.http.get<Recipes>(environment.baseURL+'recipe',{params:queryParams,headers: header});
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
    })
    return this.http.get(environment.baseURL+'recipe/home',{params:queryParams, headers: header});
  }

  getMyRecipes(currentUserRecipes:any) {
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.get(environment.baseURL+'recipe/',{ params: {user:currentUserRecipes},headers:header,})
  }


  createRecipes(formData:any){
    const header = new HttpHeaders({
      "Authorization": "Bearer "+this.token_ID,
    })
    return this.http.post(environment.baseURL+'recipe/new',formData,{headers: header})
  }

  editRecipes(formData:any,recipeId:any){
    const header = new HttpHeaders({
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.patch(environment.baseURL+'recipe/edit/'+recipeId,formData,{ headers: header});
  }

  viewRecipe(id:any){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.get(environment.baseURL+'recipe/'+id,{headers: header});
  }

  deleteRecipes(recipeID:string){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.delete(environment.baseURL+'recipe/delete/'+recipeID,{headers: header});
  }
}
