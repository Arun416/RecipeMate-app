import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() {
    console.log(this.drawerState)
   }

  public drawerState = new BehaviorSubject<any>('');

  public openDrawer() {
    this.drawerState.next(true);
  }

  public closeDrawer() {
    this.drawerState.next(false);
  }

  public toggleDrawer() {
    this.drawerState.next(!this.drawerState.value);
  }

  public getDrawerState(): Observable<boolean> {
    return this.drawerState.asObservable();
  }
}
