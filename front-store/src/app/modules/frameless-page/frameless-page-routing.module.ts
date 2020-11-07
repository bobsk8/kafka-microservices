import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FramelessPageComponent } from './frameless-page.component';
import { RedirectLoggedGuard } from 'src/app/core/guars/redirect-logged.guard';

const routes: Routes = [
  {
    path: '', component: FramelessPageComponent,
    children: [
      {
        path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        canLoad: [RedirectLoggedGuard]
      },
      { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FramelessPageRoutingModule { }
