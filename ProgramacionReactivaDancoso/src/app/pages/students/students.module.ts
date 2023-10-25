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
import { TopStudentsComponent } from './components/top-students/top-students.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [StudentsListComponent, AddEditStudentModalComponent, StudentsComponent, TopStudentsComponent],
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
    MatTableModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [StudentsListComponent, AddEditStudentModalComponent, StudentsComponent],
})
export class StudentsModule {}
