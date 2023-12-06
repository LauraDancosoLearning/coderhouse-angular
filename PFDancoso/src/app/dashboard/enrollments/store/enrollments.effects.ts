import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollmentsActions } from './enrollments.actions';
import { EnrollmentsService } from '../services/enrollments.service';
import { ErrorActions } from 'src/app/store/error/error.actions';


@Injectable()
export class EnrollmentsEffects {

  loadEnrollmentss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentsActions.loadEnrollments),
      concatMap((action) =>
        (action.courseId ?
          this.enrollmentsService.getEnrollmentsByCourseId(action.courseId) :
          this.enrollmentsService.getEnrollments()
        ).
          pipe(
            map(data => EnrollmentsActions.loadEnrollmentsSuccess({ data })),
            catchError(error => of(ErrorActions.setError({ error: { actionType: EnrollmentsActions.loadEnrollmentsSuccess.type, message: error?.message ?? '' } }))))
      )
    );
  });

  addEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.addEnrollments),
      concatMap((action) =>
        this.enrollmentsService.addEnrollments(...action.enrollments).pipe(
          map(() => EnrollmentsActions.abmSuccess()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: EnrollmentsActions.addEnrollments.type, message: error?.message ?? '' }}))))
      )
    );
  });

  deleteEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.deleteEnrollment),
      concatMap((action) =>
        this.enrollmentsService.deleteEnrollment(action.enrollmentId).pipe(
          map(() => EnrollmentsActions.abmSuccess()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: EnrollmentsActions.deleteEnrollment.type, message: error?.message ?? '' }}))))
      )
    );
  });

  updateEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.updateEnrollment),
      concatMap((action) =>
        this.enrollmentsService.updateEnrollment(action.enrollment).pipe(
          map(() => EnrollmentsActions.abmSuccess()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: EnrollmentsActions.updateEnrollment.type, message: error?.message ?? '' }}))))
      )
    );
  });

  unenroll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.unenroll),
      concatMap((action) =>
        this.enrollmentsService.unenroll(action.courseId, action.studentId).pipe(
          map(() => EnrollmentsActions.abmSuccess()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: EnrollmentsActions.unenroll.type, message: error?.message ?? '' }}))))
      )
    );
  });

  constructor(private actions$: Actions, private enrollmentsService: EnrollmentsService) { }
}
