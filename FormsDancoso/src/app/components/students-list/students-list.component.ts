import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {

  public students: Student[] = [];

  ngOnInit() {
    registerLocaleData(es);
  }

  onStudentAdded(student: Student){
    this.students.push(student);
  }
}
