import { Injectable, NgZone } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  public drawerState = new BehaviorSubject<boolean>(false);
  private isToggling = false;
  constructor(private ngZone: NgZone) {
   }

 
  public openDrawer() {
    this.ngZone.run(() => {
    this.drawerState.next(true);
    })
  }

  public closeDrawer() {
    this.ngZone.run(() => {
    this.drawerState.next(false);
    })
  }

  public toggleDrawer() {
    if (!this.isToggling) {
      this.isToggling = true;
    this.ngZone.run(() => {
      this.drawerState.next(!this.drawerState.value);
      setTimeout(() => {
        this.isToggling = false;
      }, 0);
    });
  }
  }

  public getDrawerState(): Observable<boolean> {
    return this.drawerState.asObservable();
  }
}
