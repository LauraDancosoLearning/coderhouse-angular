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

  loadStudents() {
    this.students = [
      {
        name: 'pedro',
        lastName: 'gonzalez',
        dni: 40888909,
        avgMark: 8.7,
      },
      {
        name: 'juan',
        lastName: 'fernandez',
        dni: 38888909,
        avgMark: 4.5,
      },
      {
        name: 'camila',
        lastName: 'perez',
        dni: 42888909,
        avgMark: 3,
      },
      {
        name: 'norberto',
        lastName: 'gimenez',
        dni: 42888909
      }
    ];
  }
}
