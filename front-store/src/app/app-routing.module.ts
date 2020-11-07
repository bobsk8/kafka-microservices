import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./modules/frameless-page/frameless-page.module').then(m => m.FramelessPageModule) },
  { path: 'main', loadChildren: () => import('./modules/frame-page/frame-page.module').then(m => m.FramePageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
