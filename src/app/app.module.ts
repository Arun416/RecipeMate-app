import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './services/auth-guard-service/auth.guard';
import { MatDividerModule} from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule, 
    AppRouting, 
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }), 
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDividerModule,MatListModule,MatSidenavModule,
    MatToolbarModule

  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard]
})
export class AppModule {}
