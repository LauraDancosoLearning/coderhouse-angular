import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function gmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isGmail = control.value?.includes('@gmail.com');
      return !!control.value && !isGmail ? { email: {gmail: true} } : null;
    };
  }