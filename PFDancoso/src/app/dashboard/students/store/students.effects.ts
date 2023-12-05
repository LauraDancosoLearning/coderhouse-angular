import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StudentsActions } from './students.actions';
import { StudentsService } from '../services/students.service';
import { ErrorActions } from 'src/app/store/error/error.actions';
import { Student } from '../models/student.model';
import { FullnamePipe } from 'src/app/shared/pipes/fullname.pipe';


@Injectable()
export class StudentsEffects {

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      concatMap(() =>
        this.studentsService.getStudents().pipe(
          map(data => StudentsActions.loadStudentsSuccess({ data })),
          catchError(error => of(ErrorActions.setError( { error : { actionType: StudentsActions.loadStudents.type, message: error?.message ?? '' }})))))
    );
  });

  loadTopStudentsName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadTopStudents),
      concatMap(({topNumber}) =>
        this.studentsService.getStudents()
        .pipe(
          map((students) => {
            let studentsWithAvg = students
              .filter((s: Student) => s.marks?.length > 0)
              .map((s: Student) => ({
                ...s,
                avg: this.studentsService.getMarksAvg(s.marks)
              }));
            studentsWithAvg.sort((a, b) => b.avg - a.avg);
    
            return studentsWithAvg
              .map((s: Student) => new FullnamePipe().transform(s))
              .slice(0, topNumber);
          })
        )
        .pipe(
          
          map(data => StudentsActions.loadTopStudentsSuccess({ data })),
          catchError(error => of(ErrorActions.setError( { error : { actionType: StudentsActions.loadStudents.type, message: error?.message ?? '' }}))))      )
    );
  });

  addStudent$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentsActions.addStudent),
      concatMap((action) =>
        this.studentsService.addStudent(action.student).pipe(
          map(() => StudentsActions.loadStudents()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: StudentsActions.loadStudents.type, message: error?.message ?? '' }}))))
      )
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      concatMap((action) =>
        this.studentsService.deleteStudent(action.studentId).pipe(
          map(() => StudentsActions.loadStudents()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: StudentsActions.loadStudents.type, message: error?.message ?? '' }}))))
      )
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      concatMap((action) =>
        this.studentsService.updateStudent(action.student).pipe(
          map(() => StudentsActions.loadStudents()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: StudentsActions.loadStudents.type, message: error?.message ?? '' }}))))
      )
    );
  });

  constructor(private actions$: Actions, private studentsService: StudentsService) {}
}
