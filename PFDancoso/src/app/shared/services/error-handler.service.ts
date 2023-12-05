import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { SnackBarError, SnackBarErrorType } from '../models/snackbarError.model';
import { selectError } from 'src/app/store/error/error.selectors';
import { filter } from 'rxjs';
import { ErrorActions } from 'src/app/store/error/error.actions';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private _snackBar: MatSnackBar,
    private store: Store) {
      
  }

  showError(error?: SnackBarErrorType) {
    const {actionType = '', message } = error || { message: 'unexpected error'};
    this._snackBar.open(`Error ${actionType ? 'in': ''} ${actionType}${message ? ': ' : ''}${message}`, "Dismiss")
    .afterDismissed().subscribe(
      ()=> this.store.dispatch(ErrorActions.resetError())
    );
  }

  handleErrors(){
    this.store.select(selectError)
      .pipe(filter(e=> e!= null))
      .subscribe(
        {
          next: (error)=> this.showError(error ?? {})
        }
      )
  }
}
