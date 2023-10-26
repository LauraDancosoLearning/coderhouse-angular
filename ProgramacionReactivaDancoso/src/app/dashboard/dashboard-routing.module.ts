import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'students',
        loadChildren: () => import("../dashboard/students/students.module").then((m)=> m.StudentsModule)
      },
      
    ]
  },
  {
    path: '**',
    redirectTo: ""
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
