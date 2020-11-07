import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FramelessPageRoutingModule } from './frameless-page-routing.module';
import { FramelessPageComponent } from './frameless-page.component';


@NgModule({
  declarations: [FramelessPageComponent],
  imports: [
    CommonModule,
    FramelessPageRoutingModule
  ]
})
export class FramelessPageModule { }
