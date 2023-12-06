import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Student } from 'src/app/dashboard/students/models/student.model';
import { EnrollmentsService } from '../../services/enrollments.service';
import { Store } from '@ngrx/store';
import { EnrollmentsActions } from '../../store/enrollments.actions';

@Component({
  selector: 'enrollments-list',
  templateUrl: './enrollments-list.component.html',
  styleUrls: ['./enrollments-list.component.scss']
})
export class EnrollmentsListComponent implements OnDestroy, OnInit, OnChanges{
  @Input() students: Student[] = [];
  @Input() courseId: number = 0;

  displayedColumns: string[] = ['fullName', 'email', 'dni', 'actions'];
  unsubscribe: Subject<void> = new Subject();
  
  @ViewChild(MatTable) public table?: MatTable<Student>;

  constructor(private store: Store){}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    registerLocaleData(es);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  unenrrolStudent(studentId:number){
    this.store.dispatch(EnrollmentsActions.unenroll({ courseId: this.courseId, studentId: studentId}));
  }

  removeTooltip(student: Student){
    return `remove ${student.name} from course`;
  }
}
