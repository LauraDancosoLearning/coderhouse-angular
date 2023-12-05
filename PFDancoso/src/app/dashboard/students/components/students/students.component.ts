import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentModalComponent } from '../add-edit-student-modal/add-edit-student-modal.component';
import { StudentsService } from '../../services/students.service';
import { Store } from '@ngrx/store';
import { StudentsActions } from '../../store/students.actions';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  constructor(public dialog: MatDialog,
    private store: Store) {}
  
  openAddStudentModal() {
    this.dialog.open(AddEditStudentModalComponent, {
      disableClose: true
    })
    .afterClosed().subscribe(s=>{
      if(!!s){
        this.store.dispatch(StudentsActions.addStudent({student: s}));
      }
    });
  }
}
