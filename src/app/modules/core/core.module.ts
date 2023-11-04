import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
// modules
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CoreRoutingModule } from './core-routing.module';
//services
import { DrawerService } from '../../services/drawerservice/drawer.service';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatChipsModule} from '@angular/material/chips';
import { MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LayoutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    CarouselModule.forRoot(),
    MatButtonModule,MatCardModule,MatInputModule,
    MatFormFieldModule,MatProgressSpinnerModule,
    MatChipsModule,MatIconModule
  ],
  exports: [RouterModule, HeaderComponent, FooterComponent, LayoutComponent],
  providers:[DrawerService]
})
export class CoreModule {}
