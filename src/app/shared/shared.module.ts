import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './time.pipe';



@NgModule({
  declarations: [TimeAgoPipe],
  imports: [
    CommonModule
  ],
  exports: [TimeAgoPipe]
})
export class SharedModule { }
