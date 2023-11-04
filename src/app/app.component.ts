import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerService } from './services/drawerservice/drawer.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'CodeSandbox';
  currentUserName:any;
  spinnerType:any = "square-jelly-box"
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(private drawerService: DrawerService,){}

  isDrawerOpen$ = this.drawerService.getDrawerState();


  ngOnInit(): void {
    this.isDrawerOpen$.subscribe((isOpen) => {
      if (isOpen) {
        this.drawer?.open();
      } else {
        this.drawer?.close();
      }
    });
  }

  isUserAuth(){
    return localStorage.getItem('auth')
  }

  getUsername(){
    if(this.isUserAuth()){
      this.currentUserName = JSON.parse(localStorage.getItem('currentUser')|| '')
      return this.currentUserName;
    }
  }
}
