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
    this.router.navigateByUrl('/login');
    this.isDrawerOpen$.subscribe((isOpen) => {
     if(isOpen === true){
      this.drawerService.toggleDrawer();
     }
    })
   
  }

}
