import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';



@NgModule({
  declarations: [  
    EnrollmentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EnrollmentsComponent
  ]
})
export class EnrollmentsModule { }
