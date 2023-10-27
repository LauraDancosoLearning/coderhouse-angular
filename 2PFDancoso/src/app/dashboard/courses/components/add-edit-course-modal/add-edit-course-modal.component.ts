import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-add-edit-course-modal',
  templateUrl: './add-edit-course-modal.component.html',
  styleUrls: ['./add-edit-course-modal.component.scss']
})
export class AddEditCourseModalComponent {
  form: FormGroup;

  constructor(
    public errorService: ErrorService,
    public formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddEditCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public course?: Course
  ) {

    this.form = formBuilder.group({
      id: formBuilder.control(null),
      name: formBuilder.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: formBuilder.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      startDate: formBuilder.control(null, [Validators.required]),
      endDate: formBuilder.control(null, [Validators.required]),
    });

    if (this.course) {
      this.form.patchValue(this.course);
    }
  }

  onSubmit() {
    this.matDialogRef.close(this.form.value);
    this.form.reset();
  }

  showError(key: string) {
    return !!this.form.get(key)?.errors && this.form.get(key)?.touched;
  }

}
