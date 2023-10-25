import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/pages/students/models/student.model';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { StudentsService } from '../../services/students.service';

import {MatTable} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentModalComponent } from '../add-edit-student-modal/add-edit-student-modal.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['fullName', 'email','dni', 'actions'];
  unsubscribe: Subject<void> = new Subject();
  
  @ViewChild(MatTable) public table?: MatTable<Student>;

  constructor(public studentsService: StudentsService, public dialog: MatDialog){
    this.studentsService.studentsUpdated$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(()=>this.renderTable())
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    registerLocaleData(es);
  }

  renderTable(){
    this.table?.renderRows();
  }

  openEditStudentModal(student: Student) {
    this.dialog.open(AddEditStudentModalComponent, {data: student, disableClose: true})
    .afterClosed().subscribe(s=>{
      if(!!s){
        this.studentsService.updateStudent(s);
      }
    });
  }
}
