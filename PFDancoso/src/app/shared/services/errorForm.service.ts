import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorFormService {

  constructor() { }

  getErrorMessage(errorKey: string, value?: any) {
    let message;
    switch (errorKey) {
      case 'required':
        message = 'This field is required';
        break;
      case 'min':
        message = `The field must be at least ${value.min}`;
        break;
      case 'max':
        message = `The field must be a maximum of ${value.max}`;
        break;
        case 'minlength':
          message = `The field must be at least ${value.requiredLength} characters`;
          break;
      case 'maxlength':
        message = `The field must be a maximum of ${value.requiredLength} characters`;
        break;
      case 'email':
        message = !!value?.gmail
        ? 'The email must be a gmail account'
        : 'Invalid email';
        break;
      case 'loginError':
        message = 'Invalid email or password. Try again!'
        break;
      case 'invalidDateRange':
        message = "End date must be greater than start date"
        break;
      default:
        message = 'Invalid field';
        break;
    }
    return message;
  }
}
