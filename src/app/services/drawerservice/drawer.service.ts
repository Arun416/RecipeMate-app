import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() { }

  private drawerState = new BehaviorSubject<boolean>(false);

  openDrawer() {
    this.drawerState.next(true);
  }

  closeDrawer() {
    this.drawerState.next(false);
  }

  toggleDrawer() {
    this.drawerState.next(!this.drawerState.value);
  }

  getDrawerState(): Observable<boolean> {
    return this.drawerState.asObservable();
  }
}
