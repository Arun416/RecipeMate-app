import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../../auth/services/auth.service';
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
  constructor(private drawerService: DrawerService,
    private authservice:AuthService,
    private router:Router) {
  }

  ngOnInit():void {
    this.authListenerSubs = this.authservice.getAuthStatusListener()
    .subscribe(isAuthenticated=>{
        this.isUserAuthenticated = isAuthenticated
    })
    console.log(this.isUserAuthenticated,"flag");
    
  }

  isAuthenticated(){
      return localStorage.getItem('auth')
  }


  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login'])
  }

}
