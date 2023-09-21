import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    outlet: 'header',
  },
  {
    path: '',
    component: FooterComponent,
    outlet: 'footer',
  },
  {
    path: '',
    component: LayoutComponent,
  },
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LayoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule, HeaderComponent, FooterComponent, LayoutComponent],
})
export class CoreModule {}
