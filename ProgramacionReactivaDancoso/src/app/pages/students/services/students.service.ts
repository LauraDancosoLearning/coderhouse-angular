import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { STUDENTS_MOCKED } from 'src/app/data/mockData';
import { Student } from 'src/app/pages/students/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentsList: Student[] = [];
  private studentsUpdated: EventEmitter<void> = new EventEmitter();
  public studentsUpdated$: Observable<void> = this.studentsUpdated.asObservable();
  
  public students$: BehaviorSubject<Student[]>;

  constructor(){
    //For testing porpuses
    this.studentsList = STUDENTS_MOCKED;

    this.students$ = new BehaviorSubject<Student[]>(this.studentsList);    
  }

  addStudent(student: Student){
    this.studentsList.push({...student, id: new Date().getTime()});
    this.students$.next(this.studentsList);
    this.studentsUpdated.emit();
  }

  deleteStudent(id: number){
    this.studentsList = this.studentsList.filter(s=>s.id !== id);    
    this.students$.next(this.studentsList);
    this.studentsUpdated.emit();
  }
  
  updateStudent(studentToUpdate: Student){
    let student = this.studentsList.find(s=> s.id === studentToUpdate.id);
    
    const studentIndex = this.studentsList.findIndex((s=> s.id === studentToUpdate.id));
    if(studentIndex != -1){
      this.studentsList[studentIndex] = { ...student, ...studentToUpdate};
      this.students$.next(this.studentsList);
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
