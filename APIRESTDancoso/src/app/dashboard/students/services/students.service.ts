import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { STUDENTS_MOCKED } from '../../../data/mockData';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentsList: Student[] = [];
  private studentsUpdated: EventEmitter<void> = new EventEmitter();
  public studentsUpdated$: Observable<void> = this.studentsUpdated.asObservable();
  
  private students: BehaviorSubject<Student[]>;
  public students$:Observable<Student[]> ;

  constructor(){
    
    this.students = new BehaviorSubject<Student[]>(this.studentsList);
    this.students$ = this.students.asObservable();
  }

  addStudent(student: Student){
    this.studentsList.push({...student, id: new Date().getTime()});
    this.students.next(this.studentsList);
    this.studentsUpdated.emit();
  }

  deleteStudent(id: number){
    this.studentsList = this.studentsList.filter(s=>s.id !== id);    
    this.students.next(this.studentsList);
    this.studentsUpdated.emit();
  }
  
  updateStudent(studentToUpdate: Student){
    let student = this.studentsList.find(s=> s.id === studentToUpdate.id);
    
    const studentIndex = this.studentsList.findIndex((s=> s.id === studentToUpdate.id));
    if(studentIndex != -1){
      this.studentsList[studentIndex] = { ...student, ...studentToUpdate};
      this.students.next(this.studentsList);
      this.studentsUpdated.emit();
    }
  }

  getMarksAvg(marks: number[]){
    return marks?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / marks.length;
  }
  
}
