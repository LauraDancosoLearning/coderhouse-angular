import { Component, ElementRef, Inject, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, map, startWith, takeUntil, filter } from 'rxjs';
import { Student } from 'src/app/dashboard/students/models/student.model';
import { StudentsService } from 'src/app/dashboard/students/services/students.service';
import { ErrorFormService } from 'src/app/shared/services/errorForm.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-enroll-student-modal',
  templateUrl: './enroll-student-modal.component.html',
  styleUrls: ['./enroll-student-modal.component.scss']
})
export class EnrollStudentModalComponent implements OnDestroy{

  separatorKeysCodes: number[] = [ENTER, COMMA];
  studentCtrl: FormControl<string | null | Student> = new FormControl('');
  filteredStudentsIds: Observable<number[]>;
  studentsIdsForm = new FormControl();
  allstudents: Student[] = [];
  allstudentsIds: number[] = [];
  unsubscribe: Subject<void> = new Subject();


  @ViewChild('studentInput') studentInput!: ElementRef<HTMLInputElement>;
  
  constructor(
    public errorFormService: ErrorFormService,
    public formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EnrollStudentModalComponent>,
    public studentsService: StudentsService,
    @Inject(MAT_DIALOG_DATA) public data: {enrolledStudentsIds?: number[], courseId?:number}
  ) {
    this.studentsService.students$?.pipe(takeUntil(this.unsubscribe))
    .subscribe(s=>{
      this.allstudents = s;
      this.allstudentsIds = s?.map(s=>s.id ?? 0) ?? []
    })
    

    this.filteredStudentsIds = this.studentCtrl.valueChanges.pipe(
      startWith(null),
      takeUntil(this.unsubscribe),
      map((student: string | null| Student) => 
        student ? this._filter((student as Student)?.name ?? student) : this.allstudents.slice().map(s=>s.id)
      ),
      map((students)  =>
      students.filter((f) =>!this.studentsIdsForm.value?.includes(f)).map((stu)=>stu ?? 0)
      ),
    );
    
    this.studentsIdsForm.setValue(this.data.enrolledStudentsIds);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit(){
    this.matDialogRef.close(this.studentsIdsForm.value.filter((id: number) => !this.data.enrolledStudentsIds?.includes(id) ).map((id:number)=>({studentId: id, courseId: this.data.courseId } as Enrollment)));
    this.studentCtrl.reset();
    this.studentsIdsForm.reset()
  }

  remove(student: string): void {
    console.log("remove", student)
    if(this.studentsIdsForm.value) this.studentsIdsForm.setValue(this.studentsIdsForm.value?.filter((f:any)=>f!=student));
    this.studentCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.studentsIdsForm.setValue([
      ...(this.studentsIdsForm.value || []),
      event.option.value.id,
    ]);
    this.studentInput.nativeElement.value = '';
    this.studentCtrl.setValue(null);
  }

  private _filter(value: string): number[] {
    const filterValue = value.toLowerCase();
    return this.allstudents.filter((student) =>
      `${student.lastName} ${student.name} ${student.dni}`.includes(filterValue))
      .map(sts=>sts.id ?? 0)
    ;
  }

  getStudent(studentId: number){
    return this.allstudents.find(s=> s.id == studentId);
  }
}
