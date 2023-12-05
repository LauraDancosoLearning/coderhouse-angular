import { EventEmitter, Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment.model';
import { Observable, concat, concatMap, flatMap, forkJoin, map, mergeMap, shareReplay, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private enrollmentsUpdated: EventEmitter<void> = new EventEmitter();
  public enrollmentsUpdated$: Observable<void> = this.enrollmentsUpdated.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  getEnrollments(){
    return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments`);
  }

  getEnrollmentsByCourseId(courseId: number){
    return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?courseId=${courseId}`)
  }

  addEnrollments(...enrollments: Enrollment[]) {
    let postSubs = enrollments.map(
      (enrollment) =>
      this.httpClient.post(`${environment.baseUrl}/enrollments`, enrollment)
    );
    return forkJoin(postSubs).pipe(tap(()=>this.enrollmentsUpdated.emit()));
  }

  deleteEnrollment(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/enrollments/${id}`)
    .pipe(tap(()=>this.enrollmentsUpdated.emit()));
  }

  unenroll(courseId: number, studentId?: number) {
    return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?courseId=${courseId}&studentId=${studentId}`)
    .pipe(
      map(es=>(es?.length>0) ? es[0] : null),
      mergeMap((enrollment: Enrollment | null)=>{
        if(enrollment?.id){
          return this.deleteEnrollment(enrollment.id)
        }else{
          return throwError(() => new Error("Enrollemnt not found"));
        }
      }),
      tap(()=>this.enrollmentsUpdated.emit())
    );
  }

  updateEnrollment(enrollmentToUpdate: Enrollment) {
    return this.httpClient.patch(`${environment.baseUrl}/enrollments/${enrollmentToUpdate.id}`, enrollmentToUpdate).pipe(tap(()=>this.enrollmentsUpdated.emit()));
  }
}
