import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/pages/students/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students: Student[] = [];
  private studentsUpdated: EventEmitter<void> = new EventEmitter();
  public studentsUpdated$: Observable<void> = this.studentsUpdated.asObservable();

  getStudents(){
    return this.students;
  }

  addStudent(student: Student){
    this.students.push({...student, id: new Date().getTime()});
    this.studentsUpdated.emit();
  }

  deleteStudent(id: number){
    this.students = this.students.filter(s=>s.id !== id);
    this.studentsUpdated.emit();
  }
  
  updateStudent(studentToUpdate: Student){
    let student = this.students.find(s=> s.id === studentToUpdate.id);
    const studentIndex = this.students.findIndex((s=> s.id === studentToUpdate.id));
    if(studentIndex != -1){
      this.students[studentIndex] = { ...student, ...studentToUpdate};
      this.studentsUpdated.emit();
    }
  }
  
}
