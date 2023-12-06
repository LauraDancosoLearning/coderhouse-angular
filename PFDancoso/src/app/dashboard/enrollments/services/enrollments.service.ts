import { EventEmitter, Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment.model';
import { Observable, forkJoin, map, mergeMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
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
    return forkJoin(postSubs);
  }

  deleteEnrollment(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/enrollments/${id}`)
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
      })
    );
  }

  updateEnrollment(enrollmentToUpdate: Enrollment) {
    return this.httpClient.patch(`${environment.baseUrl}/enrollments/${enrollmentToUpdate.id}`, enrollmentToUpdate);
  }
}
