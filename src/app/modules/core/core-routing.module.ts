import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LayoutComponent } from "./layout/layout.component";


const routes: Routes = [
    {
      path: '',
      component: HeaderComponent,
      outlet: 'header',
      // canActivate: [AuthGuard]
    },
    {
      path: '',
      component: FooterComponent,
      outlet: 'footer',
      // canActivate: [AuthGuard]
    },
    {
      path: '',
      component: LayoutComponent,
      // canActivate: [AuthGuard]
    },
  ];
  

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class CoreRoutingModule {}