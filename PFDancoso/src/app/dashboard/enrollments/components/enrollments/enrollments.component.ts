import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Enrollment } from '../../models/enrollment.model';
import { Observable, Subject, map, mergeMap, takeUntil, shareReplay, tap } from 'rxjs';
import { EnrollmentsService } from '../../services/enrollments.service';
import { Student } from 'src/app/dashboard/students/models/student.model';
import { StudentsService } from 'src/app/dashboard/students/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollStudentModalComponent } from '../enroll-student-modal/enroll-student-modal.component';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { EnrollmentsActions } from '../../store/enrollments.actions';
import { selectEnrollments } from '../../store/enrollments.selectors';
import { Q } from '@angular/cdk/keycodes';

@Component({
  selector: 'enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
})
export class EnrollmentsComponent implements OnDestroy {
  @Input()
  get courseId(): number { return this._courseId; }
  set courseId(number: number) {
    this._courseId = number ?? 0;
    () => this.loadEnrollments();
  }
  private _courseId: number = 0;

  enrollments$?: Observable<Enrollment[]>;
  enrolledStudents$?: Observable<Student[]>;
  unsubscribe: Subject<void> = new Subject();

  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialog,
    private store: Store,
    private actions$: Actions
  ) {
    this.loadEnrollments();
    this.initEnrollments();
    this.actions$.pipe(ofType(EnrollmentsActions.abmSuccess)).subscribe(()=> this.loadEnrollments());
  }

  initEnrollments() {
    this.enrollments$ = this.store.select(selectEnrollments)
    .pipe(
      shareReplay(),
      takeUntil(this.unsubscribe)
    );

    this.enrolledStudents$ = this.enrollments$.pipe(
      takeUntil(this.unsubscribe),
      map((enrollments) => enrollments.map((e) => e.studentId)),
      mergeMap((ids) =>
        this.studentsService.getStudents().pipe(
          map((students) => students.filter((s) => ids.includes(s.id ?? 0)))
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openEnrollStudentsModal(enrollments: Enrollment[], students: Student[]){
    const studentsIds= students.map(s=>s.id);
    this.dialog.open(EnrollStudentModalComponent, {
      disableClose: true,
      data: {enrolledStudentsIds: studentsIds, courseId: this.courseId},
      width: '70%'
    })
    .afterClosed().subscribe((es:Enrollment[])=>{
        if(es?.length>0)
          this.store.dispatch(EnrollmentsActions.addEnrollments({ enrollments: es || []}))
    });
  }

  loadEnrollments(){
    this.store.dispatch(EnrollmentsActions.loadEnrollments({courseId: this.courseId}));
  }
}
