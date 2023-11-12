import { EventEmitter, Injectable } from '@angular/core';
import { Observable, shareReplay, tap, BehaviorSubject } from 'rxjs';
import { Student } from '../models/student.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentsUpdated: EventEmitter<void> = new EventEmitter();
  public studentsUpdated$: Observable<void> = this.studentsUpdated.asObservable();
  public students$!:Observable<Student[]>;

  constructor(private httpClient: HttpClient){
    this.getStudents();
  }

  getStudents(){
    this.students$ = this.httpClient.get<Student[]>(`${environment.baseUrl}/students`).pipe(shareReplay(),
    tap(()=>this.studentsUpdated.emit())
    )
  }

  addStudent(student: Student){
    return this.httpClient.post(`${environment.baseUrl}/students`, student).pipe(
      tap(() => {
        this.getStudents();
        this.studentsUpdated.emit();
      })
    );
  }

  deleteStudent(id: number){
    return this.httpClient.delete(`${environment.baseUrl}/students/${id}`).pipe(tap(() => {
      this.getStudents();
      this.studentsUpdated.emit();
    }))
  }
  
  updateStudent(studentToUpdate: Student){
    return this.httpClient.put(`${environment.baseUrl}/students/${studentToUpdate.id}`, studentToUpdate).pipe(tap(() => {
      this.getStudents();
      this.studentsUpdated.emit();
    }))
  }

  getMarksAvg(marks: number[]){
    return marks?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / marks.length;
  }
  
}
