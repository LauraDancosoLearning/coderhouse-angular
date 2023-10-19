import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/pages/students/models/student.model';
import { gmailValidator } from 'src/app/shared/validators/gmailValidator';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-edit-student-modal',
  templateUrl: './add-edit-student-modal.component.html',
  styleUrls: ['./add-edit-student-modal.component.scss'],
})
export class AddEditStudentModalComponent {
  subscriptions: Subscription[] = [];
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddEditStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public student?: Student
  ) {
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
    });

    if (this.student) {
      this.form.patchValue(this.student);
    }
  }

  addStudent() {
    this.matDialogRef.close(this.form.value);
    this.form.reset();
  }

  showError(key: string) {
    return !!this.form.get(key)?.errors && this.form.get(key)?.touched;
  }

  getErrorMessage(key: string, value: any) {
    let message;
    switch (key) {
      case 'required':
        message = 'This field is required';
        break;
      case 'min':
        message = `The field must be at least ${value.min}`;
        break;
      case 'max':
        message = `The field must be a maximum of ${value.max}`;
        break;
      case 'email':
        message = !!value?.gmail
          ? 'The email must be a gmail account'
          : 'Invalid email';
        break;
      default:
        message = 'Invalid field';
        break;
    }
    return message;
  }
}
