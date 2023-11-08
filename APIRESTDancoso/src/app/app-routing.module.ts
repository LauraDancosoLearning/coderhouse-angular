import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './core/guards/dashboard.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import("../app/dashboard/dashboard.module").then((m)=> m.DashboardModule),
    canActivate: [dashboardGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
