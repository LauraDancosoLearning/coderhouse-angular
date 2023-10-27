import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { COURSES_MOCKED } from 'src/app/data/mockData';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesList: Course[] = [];
  private coursesUpdated: EventEmitter<void> = new EventEmitter();
  public coursesUpdated$: Observable<void> = this.coursesUpdated.asObservable();
  
  public courses: BehaviorSubject<Course[]>;
  public courses$:Observable<Course[]> ;

  constructor(){
    //For testing porpuses
    this.coursesList = COURSES_MOCKED;

    this.courses = new BehaviorSubject<Course[]>(this.coursesList);
    this.courses$ = this.courses.asObservable();
  }

  addCourse(Course: Course){
    this.coursesList.push({...Course, id: new Date().getTime()});
    this.courses.next(this.coursesList);
    this.coursesUpdated.emit();
  }

  deleteCourse(id: number){
    this.coursesList = this.coursesList.filter(s=>s.id !== id);    
    this.courses.next(this.coursesList);
    this.coursesUpdated.emit();
  }
  
  updateCourse(courseToUpdate: Course){
    let Course = this.coursesList.find(s=> s.id === courseToUpdate.id);
    
    const courseIndex = this.coursesList.findIndex((s=> s.id === courseToUpdate.id));
    if(courseIndex != -1){
      this.coursesList[courseIndex] = { ...Course, ...courseToUpdate};
      this.courses.next(this.coursesList);
      this.coursesUpdated.emit();
    }
  }
}
