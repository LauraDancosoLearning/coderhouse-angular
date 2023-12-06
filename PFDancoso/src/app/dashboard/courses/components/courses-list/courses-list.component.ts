import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { AddEditCourseModalComponent } from '../add-edit-course-modal/add-edit-course-modal.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  columns = ['name', 'description','startDate', 'endDate','actions'];
  displayedColumns: string[] = this.columns;
  unsubscribe: Subject<void> = new Subject();
  
  @ViewChild(MatTable) public table?: MatTable<Course>;

  constructor(public coursesService: CoursesService, public dialog: MatDialog, public authService: AuthService){
    this.coursesService.coursesUpdated$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(()=>this.renderTable())
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    registerLocaleData(es);
  }

  renderTable(){
    this.table?.renderRows();
  }

  openEditCourseModal(course: Course) {
    this.dialog.open(AddEditCourseModalComponent, {data: course, disableClose: true})
    .afterClosed().subscribe(c=>{
      if(!!c){
        this.coursesService.updateCourse(c).subscribe(
          {
            next: ()=>{},
            error: (err)=> {
              
            },
          });
      }
    });
  }

  deleteCourse(id: number){
    this.coursesService.deleteCourse(id).subscribe(
      {
        next: ()=>{},
        error: (err)=> {
          
        },
      }
    )
  }
}