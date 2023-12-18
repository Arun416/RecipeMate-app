import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerService } from '../../../services/drawerservice/drawer.service';
import { AuthService } from '../../../services/authService/auth.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  authListenerSubs!:Subscription
  isDrawerOpen$ = this.drawerService.getDrawerState();
  IsUserAuthenticated =  this.authService.getCurrentUserId();
  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
  
  constructor(private drawerService: DrawerService,
    public authService:AuthService,
    private router:Router) {
  }

  ngOnInit():void {
    console.log(this.IsUserAuthenticated);
  }

  togglemenuBar() {
    this.drawerService.toggleDrawer();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isDrawerOpen$.subscribe((isOpen) => {
     if(isOpen === true){
      this.drawerService.toggleDrawer();
     }
    })
  }

  getUser(){
    let currentUser:any = this.authService.getCurrentUser();
    return currentUser.source._value.username;
  }

}
