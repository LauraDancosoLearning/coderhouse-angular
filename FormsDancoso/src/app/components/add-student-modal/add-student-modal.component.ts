import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { gmailValidator } from 'src/app/validators/gmailValidator';

@Component({
  selector: 'add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss'],
})
export class AddStudentModalComponent {
  subscriptions: Subscription[] = [];
  form: FormGroup;

  @Output() studentAdded: EventEmitter<Student> = new EventEmitter();

  constructor(
    public modalRef: BsModalRef,
    private modalService: BsModalService,
    public formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      name: formBuilder.control(null, [Validators.required]),
      lastName: formBuilder.control(null, [Validators.required]),
      email: formBuilder.control(null, [Validators.email, Validators.required, gmailValidator()]),
      dni: formBuilder.control(null, [
        Validators.required,
        Validators.minLength(0),
        Validators.min(1),
      ]),
      avgMark: formBuilder.control(0, [
        Validators.min(0),
        Validators.max(10),
        Validators.required,
      ]),
    });
  }

  cancel() {
    this.modalRef.hide();
  }

  addStudent() {
    this.studentAdded.emit(this.form.value);
    this.modalRef.hide();
    this.form.reset();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    document.getElementById('name')?.focus();
    this.modalRef.onHide?.subscribe(() => this.form.reset());
  }

  showError(key: string) {
    return !!this.form.get(key)?.errors && this.form.get(key)?.touched;
  }

  getErrorMessage(key: string, value: any) {
    let message;
    switch (key) {
      case 'required':
        message = 'Campo requerido';
        break;      
      case 'min':
        message = `El campo debe ser mínimo ${value.min}`;
        break;
      case 'max':
        message = `El campo debe ser máximo ${value.max}`;
        break;
      case 'email':
          message = !!value?.gmail ? 'El mail debe ser de gmail' : 'Mail inválido';
          break;
      default:
        message = 'Campo inválido';
        break;
    }
    return message;
  }
}
