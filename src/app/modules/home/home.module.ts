import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const routes:Routes = [
    {path:'', component:HomeComponent}
]

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes) ,ToastrModule.forRoot(),
        CarouselModule.forRoot(),
        FormsModule,
        MatDividerModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatChipsModule,
        NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }), ],
    exports: [HomeComponent,RouterModule]
})

export class HomeModule {}