import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m=> m.LoginModule)
  },
  { 
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
