import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { Subject, pipe, takeUntil } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnDestroy{

  id: number = 0;
  course?: Course;
  unsubscribe: Subject<void> = new Subject();


  constructor(private router: ActivatedRoute, private coursesService: CoursesService){
    router.params.subscribe((p)=> {
      let id = p['id'];
      this.id = parseInt(id);
      this.setCourse();
    });

  }

  setCourse(){
    this.coursesService.courses$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      courses=>{
        this.course = courses?.find(c=> c.id == this.id);
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
