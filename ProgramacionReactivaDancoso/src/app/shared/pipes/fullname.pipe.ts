import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../pages/students/models/student.model';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(student: Student, ...args: unknown[]): unknown {
    return   `${new TitleCasePipe().transform(student.lastName)}, ${new TitleCasePipe().transform(student.name)}`;
  }

}
