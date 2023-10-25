import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentModalComponent } from '../add-edit-student-modal/add-edit-student-modal.component';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student.model';
import { TopStudentsModalComponent } from '../top-students-modal/top-students-modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  constructor(public dialog: MatDialog,
    private studentsService: StudentsService) {}
  
  openAddStudentModal() {
    this.dialog.open(AddEditStudentModalComponent, {
      disableClose: true
    })
    .afterClosed().subscribe(s=>{
      if(!!s){
        console.log('ee')
        this.studentsService.addStudent(s);
      }
    });
  }

  openTopStudentsModal(top: number){
    this.dialog.open(TopStudentsModalComponent);
  }
}
