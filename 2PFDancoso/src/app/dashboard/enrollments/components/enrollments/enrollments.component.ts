import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Enrollment } from '../../models/enrollment.model';
import { Observable, Subject, map, mergeMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentsService } from '../../services/enrollments.service';
import { Student } from 'src/app/dashboard/students/models/student.model';
import { StudentsService } from 'src/app/dashboard/students/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollStudentModalComponent } from '../enroll-student-modal/enroll-student-modal.component';

@Component({
  selector: 'enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
})
export class EnrollmentsComponent implements OnDestroy, OnChanges {
  @Input() courseId: number = 0;
  enrollments$?: Observable<Enrollment[]>;
  enrolledStudents$?: Observable<Student[]>;
  unsubscribe: Subject<void> = new Subject();

  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    public dialog: MatDialog,
  ) {
    this.fillEnrollments();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['courseId']?.isFirstChange()) {
      this.fillEnrollments();
    }
  }

  fillEnrollments() {
    this.enrollments$ = this.enrollmentsService.enrollments$.pipe(
      takeUntil(this.unsubscribe),
      map((es: Enrollment[]) => es.filter((e) => e.courseId == this.courseId))
    );

    this.enrolledStudents$ = this.enrollments$.pipe(
      takeUntil(this.unsubscribe),
      map((enrollments) => enrollments.map((e) => e.studentId)),
      mergeMap((ids) =>
        this.studentsService.students$.pipe(
          map((students) => students.filter((s) => ids.includes(s.id ?? 0)))
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openEnrollStudentsModal(students: Student[]){
    const studentsIds= students.map(s=>s.id);
    this.dialog.open(EnrollStudentModalComponent, {
      disableClose: true,
      data: {enrolledStudentsIds: studentsIds, courseId: this.courseId},
      width: '70%'
    })
    .afterClosed().subscribe((es:Enrollment[])=>{
        this.enrollmentsService.addEnrollments(...es || []);
    });
  }
}
