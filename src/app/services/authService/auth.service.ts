import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,map,switchMap,tap } from 'rxjs';
import  {JwtPayload, jwtDecode}  from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export const USER_STORAGE_KEY = 'auth'

export interface UserData {
  token: string,
  id: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:BehaviorSubject<UserData | null | undefined> = new 
  BehaviorSubject<UserData | null | undefined>(null) 
  /* private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable(); */

  constructor(private http:HttpClient,
    private router:Router) {
    /* const token = localStorage.getItem('auth');
    this._isLoggedIn$.next(!!token); */
    this.loadUser();
   }

  loadUser(){
    const token = localStorage.getItem(USER_STORAGE_KEY);
    if(token){
      const decoded:any = jwtDecode<JwtPayload>(token);
      console.log('🚀 token Loaded in auth service',decoded);
      const userData:UserData = {
        token: token,
        id: decoded.userData.id,
        username: decoded.userData.username
      };
      console.log(decoded,"load")
      this.user.next(userData);
    }
    else {
      this.user.next(null);
    }
  }

  signup(userData:any){
    return this.http.post(environment.baseURL+'auth/signup',userData).
    pipe(switchMap((res:any)=>{
      const userLoginData = {
        email: userData.email,
        password: userData.password,
        rememberMe: false,
      }
      return this.login(userLoginData)
    }))
  }

  login(userFormData:any){
    return this.http.post(environment.baseURL+'auth/login',userFormData).pipe(map((res:any)=>{
      const token = res.token;
      localStorage.setItem(USER_STORAGE_KEY,token)
      const decode:any = jwtDecode<JwtPayload>(res.token)
      console.log(decode,"decoded data")
      const userInfo:UserData ={
        token : res.token,
        id: decode.userData.id,
        username: decode.userData.username
      }
      this.user.next(userInfo);
      return userInfo;
    }))
    
  }

  logout(){
    localStorage.removeItem(USER_STORAGE_KEY);
    this.router.navigate(['/login']);
    this.user.next(null);
  }

  public getCurrentUser() {
    return this.user.asObservable();
  }

  public getCurrentUserId(){
    return this.user.getValue()?.id
  }

  loggedIn() {
    return !!localStorage.getItem(USER_STORAGE_KEY)
  }

  getToken(){
    return localStorage.getItem(USER_STORAGE_KEY)
  }
  
}
