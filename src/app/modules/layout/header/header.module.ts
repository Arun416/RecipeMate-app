import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { MatDividerModule } from "@angular/material/divider";
import { ToastrModule } from "ngx-toastr";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

const routes:Routes = [
    {path:'', component:HeaderComponent}
]

@NgModule({
    declarations :[HeaderComponent],
    imports: [ 
        CommonModule,
        ToastrModule.forRoot(),
        MatDividerModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,RouterModule.forChild(routes)],
    exports: [HeaderComponent,RouterModule]
})

export class HeaderModule {}