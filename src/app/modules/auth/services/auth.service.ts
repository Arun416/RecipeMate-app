import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  private token!: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  
  getToken(){
      return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signup(userData:any){
    return this.http.post('http://localhost:3000//api/auth/signup',userData)
  }

  login(userData:any){
    return this.http.post('http://localhost:3000/api/auth/login',userData).pipe(map((res:any)=>{
      const token = res.token;
      this.token = token;
      localStorage.setItem('auth',token)
      localStorage.setItem('currentUser',JSON.stringify(res.data))
      this.authStatusListener.next(true)
    }))
    
  }

  logout(){
    localStorage.removeItem('auth');
    this.authStatusListener.next(false)
  }

  
}
