import { createReducer, on } from '@ngrx/store';
import { ErrorActions } from './error.actions';
import { SnackBarErrorType } from 'src/app/shared/models/snackbarError.model';


export interface ErrorState {
  error: SnackBarErrorType;
}

const initialState: ErrorState = {
  error: null,
};

export const errorReducer = createReducer(
  initialState,

  on(ErrorActions.setError, (state, {error: errorFromAction}) => {
    return {
      ...state,
      error: errorFromAction,
    }
  }),

  on(ErrorActions.resetError, (state)=>({
    error: null
  }))
);


