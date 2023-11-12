import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RandomService } from '../../../../shared/services/random.service';
import { Student } from '../../models/student.model';
import { gmailValidator } from '../../../../shared/validators/gmailValidator';
import { ErrorFormService } from 'src/app/shared/services/errorForm.service';

@Component({
  selector: 'add-edit-student-modal',
  templateUrl: './add-edit-student-modal.component.html',
  styleUrls: ['./add-edit-student-modal.component.scss'],
})
export class AddEditStudentModalComponent {
  form: FormGroup;

  randomNamePlaceholder: Promise<string>;

  constructor(
    public errorFormService: ErrorFormService,
    public randomService: RandomService,
    public formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddEditStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public student?: Student
  ) {
    this.randomNamePlaceholder = this.randomService.getRandomName();

    this.form = formBuilder.group({
      id: formBuilder.control(null),
      name: formBuilder.control(null, [Validators.required]),
      lastName: formBuilder.control(null, [Validators.required]),
      email: formBuilder.control(null, [
        Validators.email,
        Validators.required,
        gmailValidator(),
      ]),
      dni: formBuilder.control(null, [
        Validators.required,
        Validators.minLength(0),
        Validators.min(1),
      ]),
      marks: formBuilder.array([
        formBuilder.control(0, [
          Validators.min(0),
          Validators.max(10),
          Validators.required,
        ])
      ])
    });

    if (this.student) {
      this.form.patchValue(this.student);
      this.student?.marks.forEach((m,i)=> {
        let fc = this.getFormControlArray(i);
        fc ? fc.patchValue(m) : this.addMarkFormControl(m)       
      })
    }
  }

  onSubmit() {
    this.matDialogRef.close(this.form.value);
    this.form.reset();
  }

  showError(key: string) {
    return !!this.form.get(key)?.errors && this.form.get(key)?.touched;
  }

  getFormArrayMarks(){
    return this.form.get('marks') as FormArray
  }

  getFormControlArray(index: number){
    return (this.form.get('marks') as FormArray).at(index) as FormControl;
  }

  addMarkFormControl(mark: number = 0){
    (this.form.get('marks') as FormArray).push(this.formBuilder.control(mark, [
      Validators.min(0),
      Validators.max(10),
      Validators.required,
    ]))
  }

  deleteMarkFormControl(index: number){
    (this.form.get('marks') as FormArray).removeAt(index);
  }
}

