import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { startDate, endDate} = control.value;
      if(startDate==null || endDate == null) return null;
      if ((new Date(startDate))?.getTime() > (new Date(endDate))?.getTime()){
        return { invalidDateRange: true}
      }
      return null;
    };
  }