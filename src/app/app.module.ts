import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { AppRouting } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, AuthModule, RecipesModule, AppRouting],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
