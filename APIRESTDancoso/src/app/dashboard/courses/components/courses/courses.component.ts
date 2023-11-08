import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../services/courses.service';
import { AddEditCourseModalComponent } from '../add-edit-course-modal/add-edit-course-modal.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  constructor(public dialog: MatDialog,
    private coursesService: CoursesService) {}
  
  openAddEditCourseModal() {
    this.dialog.open(AddEditCourseModalComponent, {
      disableClose: true
    })
    .afterClosed().subscribe(c=>{
      if(!!c){
        this.coursesService.addCourse(c);
      }
    });
  }
}
