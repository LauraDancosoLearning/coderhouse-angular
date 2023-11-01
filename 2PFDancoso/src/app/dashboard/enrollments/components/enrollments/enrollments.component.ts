import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Enrollment } from '../../models/enrollment.model';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentsService } from '../../services/enrollments.service';

@Component({
  selector: 'enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnDestroy, OnChanges{
  @Input() courseId: number = 0;
  enrollments$?: Observable<Enrollment[]>;
  unsubscribe: Subject<void> = new Subject();


  constructor(private enrollmentsService: EnrollmentsService){
    this.fillEnrollments();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes['courseId']?.isFirstChange()){
      this.fillEnrollments();
    }
  }

  fillEnrollments(){
    this.enrollments$ = this.enrollmentsService.enrollments$.pipe(
      takeUntil(this.unsubscribe),
      map(es=> es.filter(e=>e.courseId == this.courseId))
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}