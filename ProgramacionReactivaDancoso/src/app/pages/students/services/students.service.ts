import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    this.students$ = new BehaviorSubject<Student[]>(this.studentsList);

    //For testing porpuses
    this.addStudent({
      name:'pepe',
      lastName: 'ramirez',
      dni: 32873297,
      email: 'ljdfa@gmail.com',
      marks: [5]
    })
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
    console.log(studentToUpdate)
    let student = this.studentsList.find(s=> s.id === studentToUpdate.id);
    const studentIndex = this.studentsList.findIndex((s=> s.id === studentToUpdate.id));
    if(studentIndex != -1){
      this.studentsList[studentIndex] = { ...student, ...studentToUpdate};
      this.students$.next(this.studentsList);
      this.studentsUpdated.emit();
    }
  }
  
}
