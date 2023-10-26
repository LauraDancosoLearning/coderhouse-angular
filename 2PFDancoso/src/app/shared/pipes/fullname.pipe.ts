import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Student } from '../../dashboard/students/models/student.model';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(student: Student, ...args: unknown[]): string {
    return `${new TitleCasePipe().transform(student.lastName)}, ${new TitleCasePipe().transform(student.name)}`;
  }

}
