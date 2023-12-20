import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { DrawerService } from './services/drawerservice/drawer.service';
import { AuthService } from './services/authService/auth.service';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CodeSandbox';
  spinnerType:any = "square-jelly-box"
  isDrawerOpen$ = this.drawerService.getDrawerState();
  currentUser:any;
  
  @ViewChild('drawer') drawer?: MatDrawer;
  constructor(private drawerService: DrawerService,
    private authService:AuthService,
    private router:Router){
    }

  ngOnInit(): void {
    this.isDrawerOpen$.subscribe((isOpen:any) => {      
      this.drawer?.toggle();
    });
   /*  const user:any = this.authService.getCurrentUser();    
    const decoded:any = jwtDecode<JwtPayload>(user.source._value.token);
    console.log(decoded,"In app compoennt");
    
    this.currentUser =  decoded.userData.username; */
    this.getUsername()
  }

  isUserAuth(){
    return localStorage.getItem('auth');
  }

    getUsername(){

        const user:any = localStorage.getItem('auth');
        const decoded:any = jwtDecode<JwtPayload>(user);
        console.log(decoded);
        decoded.username;
    } 
}
