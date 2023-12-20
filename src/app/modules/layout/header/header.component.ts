import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerService } from '../../../services/drawerservice/drawer.service';
import { AuthService, UserData } from '../../../services/authService/auth.service';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isDrawerOpen$ = this.drawerService.getDrawerState();
  IsUserAuthenticated =  this._authService.getCurrentUserId();
  isAuthenticated: boolean = false;
  userData: UserData | null | undefined;
  private unsubscribe$: Subject<void> = new Subject<void>();
  
  constructor(private drawerService: DrawerService,
    public _authService:AuthService,
    private router:Router) {
  }

  ngOnInit():void {
    this.isDrawerOpen$.subscribe((isOpen) => {
      console.log(isOpen)
    })
    this._authService.getCurrentUser().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((user) => {
      
    });
  }

  togglemenuBar() {
    return this.drawerService.toggleDrawer();
  }

  logout() {
    this._authService.logout();
  
    this.isDrawerOpen$.subscribe((isOpen) => {
     if(isOpen==true){
      this.drawerService.toggleDrawer();
     }
    })
  }

  getUser(){
    const user:any = localStorage.getItem('auth');
    const decoded:any = jwtDecode<JwtPayload>(user);
    return decoded.userData.username;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
