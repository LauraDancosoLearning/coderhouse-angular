import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EnrollStudentModalComponent } from './components/enroll-student-modal/enroll-student-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { EnrollmentsListComponent } from './components/enrollments-list/enrollments-list.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [  
    EnrollmentsComponent, EnrollStudentModalComponent, EnrollmentsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    SharedModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    EnrollmentsComponent
  ]
})
export class EnrollmentsModule { }
