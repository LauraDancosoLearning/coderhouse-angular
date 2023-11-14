import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorFormService } from 'src/app/shared/services/errorForm.service';
import { RandomService } from 'src/app/shared/services/random.service';
import { User } from '../../models/user.model';
import { gmailValidator } from 'src/app/shared/validators/gmailValidator';

@Component({
  selector: 'app-add-edit-user-modal',
  templateUrl: './add-edit-user-modal.component.html',
  styleUrls: ['./add-edit-user-modal.component.scss']
})
export class AddEditUserModalComponent {
  form: FormGroup;

  randomNamePlaceholder: Promise<string>;

  constructor(
    public errorFormService: ErrorFormService,
    public randomService: RandomService,
    public formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddEditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user?: User
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
      ])
    });

    if (this.user) {
      this.form.patchValue(this.user);
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

