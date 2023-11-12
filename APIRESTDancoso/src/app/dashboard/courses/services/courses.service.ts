import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { Course } from '../models/course.model';
import { COURSES_MOCKED } from 'src/app/data/mockData';
import { EnrollmentsService } from '../../enrollments/services/enrollments.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesUpdated: EventEmitter<void> = new EventEmitter();
  public coursesUpdated$: Observable<void> = this.coursesUpdated.asObservable();
  
  // private courses: BehaviorSubject<Course[]>;
  public courses$!:Observable<Course[]>;

  constructor(
    private enrollmentsService: EnrollmentsService,
    private httpClient: HttpClient
  ){
    this.getCourses();
  }

  getCourses(){
    this.courses$ = this.httpClient.get<Course[]>(`${environment.baseUrl}/courses`).pipe(shareReplay(),
    tap(()=>this.coursesUpdated.emit())
    )
  }

  addCourse(course: Course){
    return this.httpClient.post(`${environment.baseUrl}/courses`, course).pipe(
      tap(() => {
        this.getCourses();
        this.coursesUpdated.emit();
      })
    );
  }

  deleteCourse(id: number){
    this.enrollmentsService.unenroll(id);
    return this.httpClient.delete(`${environment.baseUrl}/courses/${id}`).pipe(tap(() => {
      this.getCourses();
      this.coursesUpdated.emit();
    }))
  }
  
  updateCourse(courseToUpdate: Course){
    return this.httpClient.put(`${environment.baseUrl}/courses/${courseToUpdate.id}`, courseToUpdate).pipe(tap(() => {
      this.getCourses();
      this.coursesUpdated.emit();
    }))
  }
}
