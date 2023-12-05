import { EventEmitter, Injectable } from '@angular/core';
import { Observable, shareReplay, tap, BehaviorSubject } from 'rxjs';
import { Student } from '../models/student.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient){
  }

  getStudents(){
    return this.httpClient.get<Student[]>(`${environment.baseUrl}/students`).pipe(shareReplay());
  }

  addStudent(student: Student){
    return this.httpClient.post(`${environment.baseUrl}/students`, student);
  }

  deleteStudent(id: number){
    return this.httpClient.delete(`${environment.baseUrl}/students/${id}`)
  }
  
  updateStudent(studentToUpdate: Student){
    return this.httpClient.patch(`${environment.baseUrl}/students/${studentToUpdate.id}`, studentToUpdate)
  }

  getMarksAvg(marks: number[]){
    return marks?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / marks.length;
  }
  
}
