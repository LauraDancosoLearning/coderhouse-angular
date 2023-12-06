import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from '../../services/students.service';

import {MatTable} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentModalComponent } from '../add-edit-student-modal/add-edit-student-modal.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Student } from '../../models/student.model';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Store } from '@ngrx/store';
import { StudentsActions } from '../../store/students.actions';
import { selectStudents } from '../../store/students.selectors';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnDestroy, OnInit {
  ngOnInit() {
    registerLocaleData(es)  ;
  }
  
  columns = ['fullName', 'email','dni', 'marks','actions'];
  displayedColumns: string[] = this.columns;
  unsubscribe: Subject<void> = new Subject();
  students$: Observable<Student[]>;

  @ViewChild(MatTable) public table?: MatTable<Student>;

  constructor(public studentsService: StudentsService, private store: Store, public dialog: MatDialog, private authService: AuthService){
    this.loadStudents();
    this.students$ = this.store.select(selectStudents);
    authService.userIsAdmin$.subscribe(userIsAdmin=> this.displayedColumns = userIsAdmin ? this.columns : this.columns.filter(c=>c != 'actions') )
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openEditStudentModal(student: Student) {
    this.dialog.open(AddEditStudentModalComponent, {data: student, disableClose: true})
    .afterClosed().subscribe(s=>{
      if(!!s){
        this.store.dispatch(StudentsActions.updateStudent({student: s}))
      }
    });
  }

  deleteStudent(id: number){
    this.store.dispatch(StudentsActions.deleteStudent({studentId: id}));
  }

  
  loadStudents(){
    this.store.dispatch(StudentsActions.loadStudents());
  }
}
