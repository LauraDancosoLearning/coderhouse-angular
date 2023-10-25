import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AddEditStudentModalComponent } from './components/add-edit-student-modal/add-edit-student-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatTableModule} from '@angular/material/table';

import { StudentsComponent } from './components/students/students.component';
import { TopStudentsModalComponent } from './components/top-students-modal/top-students-modal.component';

@NgModule({
  declarations: [StudentsListComponent, AddEditStudentModalComponent, StudentsComponent, TopStudentsModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    StudentsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  exports: [StudentsListComponent, AddEditStudentModalComponent, StudentsComponent],
})
export class StudentsModule {}
