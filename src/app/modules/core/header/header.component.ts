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
  isUserAuthenticated:boolean = false;
  authListenerSubs!:Subscription
  isDrawerOpen$ = this.drawerService.getDrawerState();
  constructor(private drawerService: DrawerService,
    private authservice:AuthService,
    private router:Router) {
  }

  ngOnInit():void {
    this.authListenerSubs = this.authservice.getAuthStatusListener()
    .subscribe(isAuthenticated=>{
        this.isUserAuthenticated = isAuthenticated
    })
   
    
  }

  isAuthenticated(){
      return localStorage.getItem('auth')
  }


  togglemenuBar() {
    this.drawerService.toggleDrawer();
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
    this.isDrawerOpen$.subscribe((isOpen) => {
     if(isOpen === true){
      this.drawerService.toggleDrawer();
     }
    })
   
  }

}
