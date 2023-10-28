import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatDividerModule} from '@angular/material/divider';
import { AuthGuard } from '../auth/services/auth.guard';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
const routes: Routes = [
  {
    path: '',redirectTo:'home',pathMatch:"full",
  },
  {
    path: 'home',
    component: HeaderComponent,
    outlet: 'header',
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: FooterComponent,
    outlet: 'footer',
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: LayoutComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule.forRoot(),
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [RouterModule, HeaderComponent, FooterComponent, LayoutComponent],
})
export class CoreModule {}
