import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subject, concatMap, map, takeUntil } from 'rxjs';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student.model';
import { FullnamePipe } from 'src/app/shared/pipes/fullname.pipe';
import { Store } from '@ngrx/store';
import { selectTopStudentsName } from '../../store/students.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { StudentsActions } from '../../store/students.actions';

@Component({
  selector: 'top-students',
  templateUrl: './top-students.component.html',
  styleUrls: ['./top-students.component.scss'],
})
export class TopStudentsComponent implements OnDestroy {

  @Input()
  get topNumber(): number { return this._topNumber; }
  set topNumber(number: number) {
    this._topNumber = number ?? 3;
    () => this.initStudentsList();
  }
  private _topNumber: number = 3;

  unsubscribe: Subject<void> = new Subject();

  public topStudentsName$?: Observable<string[]>;

  constructor(private store: Store, private actions$: Actions,) {
    this.topStudentsName$ = store.select(selectTopStudentsName);
    this.actions$
      .pipe(
        takeUntil(this.unsubscribe),
        ofType(StudentsActions.loadStudentsSuccess))
      .subscribe(() =>this.initStudentsList())
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initStudentsList(){
    this.store.dispatch(StudentsActions.loadTopStudents({ topNumber: this.topNumber }))
  }

}
