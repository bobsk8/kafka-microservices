import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FramePageRoutingModule } from './frame-page-routing.module';
import { FramePageComponent } from './frame-page.component';


@NgModule({
  declarations: [FramePageComponent],
  imports: [
    CommonModule,
    FramePageRoutingModule
  ]
})
export class FramePageModule { }
