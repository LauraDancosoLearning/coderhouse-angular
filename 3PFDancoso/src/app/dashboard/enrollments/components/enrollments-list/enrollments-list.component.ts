import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Student } from 'src/app/dashboard/students/models/student.model';
import { EnrollmentsService } from '../../services/enrollments.service';

@Component({
  selector: 'enrollments-list',
  templateUrl: './enrollments-list.component.html',
  styleUrls: ['./enrollments-list.component.scss']
})
export class EnrollmentsListComponent implements OnDestroy, OnInit{
  @Input() students: Student[] = [];
  @Input() courseId: number = 0;

  displayedColumns: string[] = ['fullName', 'email', 'dni', 'actions'];
  unsubscribe: Subject<void> = new Subject();
  
  @ViewChild(MatTable) public table?: MatTable<Student>;

  constructor(public enrollmentsService:EnrollmentsService){}
  ngOnInit() {
    registerLocaleData(es);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  renderTable(){
    this.table?.renderRows();
  }

  unenrrolStudent(studentId:number){
    this.enrollmentsService.unenroll(this.courseId, studentId).subscribe(
      {
        next: ()=>{
          this.enrollmentsService.getEnrollments();
          this.renderTable();
        },
        error: (err)=> {
          console.error(err)
        },
      });
  }

  removeTooltip(student: Student){
    return `remove ${student.name} from course`;
  }
}
