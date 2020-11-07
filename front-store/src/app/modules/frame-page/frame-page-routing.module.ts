import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FramePageComponent } from './frame-page.component';
import { AuthGuard } from 'src/app/core/guars/auth.guard';

const routes: Routes = [
  {
    path: '', component: FramePageComponent,
    children: [
      {
        path: 'product', loadChildren: () => import('./product/product.module'),
        canLoad: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FramePageRoutingModule { }
