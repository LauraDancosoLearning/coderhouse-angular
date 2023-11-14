import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student.model';
import { FullnamePipe } from 'src/app/shared/pipes/fullname.pipe';

@Component({
  selector: 'top-students',
  templateUrl: './top-students.component.html',
  styleUrls: ['./top-students.component.scss'],
})
export class TopStudentsComponent implements OnDestroy, OnChanges {

  @Input() public topNumber: number = 3;

  unsubscribe: Subject<void> = new Subject();

  public topStudentsName$?: Observable<string[]>;

  constructor(private studentsService: StudentsService) {
    this.studentsService.studentsUpdated$.subscribe(
      ()=> this.initStudentsList()
    )
  }
  
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initStudentsList(){
    this.topStudentsName$ = this.studentsService.students$?.pipe(
      takeUntil(this.unsubscribe),
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
          .slice(0, 3);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['topNumber']) this.initStudentsList();
  }
}
