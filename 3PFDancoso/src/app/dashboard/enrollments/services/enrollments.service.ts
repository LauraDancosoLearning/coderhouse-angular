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

  public enrollments$!: Observable<Enrollment[]>;

  constructor(private httpClient: HttpClient) {
    this.getEnrollments();
  }

  getEnrollments(){
    this.enrollments$ = this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments`).pipe(shareReplay(),
    tap(()=>this.enrollmentsUpdated.emit())
    )
  }

  addEnrollments(...enrollments: Enrollment[]) {
    let postSubs = enrollments.map(
      (enrollment) =>
      this.httpClient.post(`${environment.baseUrl}/enrollments`, enrollment).pipe(
        tap(() => {
          this.getEnrollments();
          this.enrollmentsUpdated.emit();
        })
      )
    );
    return forkJoin(postSubs);
  }

  deleteEnrollment(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/enrollments/${id}`).pipe(
      tap(() => {
      this.getEnrollments();
      this.enrollmentsUpdated.emit();
    }))
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
      tap(()=>{
        this.getEnrollments();
        this.enrollmentsUpdated.emit();
      })

    )
  }

  updateEnrollment(enrollmentToUpdate: Enrollment) {
    return this.httpClient.put(`${environment.baseUrl}/enrollments/${enrollmentToUpdate.id}`, enrollmentToUpdate).pipe(tap(() => {
      this.getEnrollments();
      this.enrollmentsUpdated.emit();
    }))
  }
}
