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
      {
        path: 'users',
        loadChildren: () => import("../dashboard/users/users.module").then((m)=> m.UsersModule)
      },
      {
        path: 'courses',
        loadChildren: () => import("../dashboard/courses/courses.module").then((m)=> m.CoursesModule)
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
