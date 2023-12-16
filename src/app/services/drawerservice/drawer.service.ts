import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() { }

  public drawerState = new BehaviorSubject<boolean>(false);

  public openDrawer() {
    this.drawerState.next(true);
  }

  public closeDrawer() {
    this.drawerState.next(false);
  }

  public  toggleDrawer() {
    this.drawerState.next(!this.drawerState.value);
  }

  public getDrawerState(): Observable<boolean> {
    return this.drawerState.asObservable();
  }
}
