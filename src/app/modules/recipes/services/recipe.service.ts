import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }


  getRecipes():Observable<any>{
    return this.http.get('http://localhost:3000/api/recipe/');
  }

  getMyRecipes(currentUserRecipes:any) {

    return this.http.get('http://localhost:3000/api/recipe/',{ params: {user:currentUserRecipes}})
  }
}
