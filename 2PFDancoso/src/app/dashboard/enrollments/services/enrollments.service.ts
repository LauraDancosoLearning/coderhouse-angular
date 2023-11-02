import { EventEmitter, Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENROLLMENTS_MOCKED } from 'src/app/data/mockData';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private enrollmentsList: Enrollment[] = [];
  private enrollmentsUpdated: EventEmitter<void> = new EventEmitter();
  public enrollmentsUpdated$: Observable<void> =
    this.enrollmentsUpdated.asObservable();

  public enrollments: BehaviorSubject<Enrollment[]>;
  public enrollments$: Observable<Enrollment[]>;

  constructor() {
    //For testing porpuses
    this.enrollmentsList = ENROLLMENTS_MOCKED;

    this.enrollments = new BehaviorSubject<Enrollment[]>(this.enrollmentsList);
    this.enrollments$ = this.enrollments.asObservable();
  }

  addEnrollments(...enrollments: Enrollment[]) {
    enrollments.forEach(
      (enrollment, id) => (enrollment.id = new Date().getTime() + id)
    );
    this.enrollmentsList = [...enrollments];
    this.enrollments.next(this.enrollmentsList);
    this.enrollmentsUpdated.emit();
  }

  deleteEnrollment(id: number) {
    this.enrollmentsList = this.enrollmentsList.filter((s) => s.id !== id);
    this.enrollments.next(this.enrollmentsList);
    this.enrollmentsUpdated.emit();
  }


  unenroll(courseId: number, studentId?: number) {
    let enrollmentId = this.enrollmentsList.find(
      (s) => s.courseId == courseId && (studentId) ? s.studentId == studentId : true
    )?.id;
    if (enrollmentId) {
      this.enrollmentsList = this.enrollmentsList.filter(
        (s) => s.id != enrollmentId
      );
      this.enrollments.next(this.enrollmentsList);
      this.enrollmentsUpdated.emit();
    }
  }

  updateEnrollment(enrollmentToUpdate: Enrollment) {
    let enrollment = this.enrollmentsList.find(
      (s) => s.id === enrollmentToUpdate.id
    );

    const enrollmentIndex = this.enrollmentsList.findIndex(
      (s) => s.id === enrollmentToUpdate.id
    );
    if (enrollmentIndex != -1) {
      this.enrollmentsList[enrollmentIndex] = {
        ...enrollment,
        ...enrollmentToUpdate,
      };
      this.enrollments.next(this.enrollmentsList);
      this.enrollmentsUpdated.emit();
    }
  }
}
