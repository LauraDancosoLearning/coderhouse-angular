import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/dashboard/users/models/user.model';
import { errorFeatureKey } from './errorFeatureKey';
import { SnackBarErrorType } from 'src/app/shared/models/snackbarError.model';

export const ErrorActions = createActionGroup({
  source: errorFeatureKey,
  events: {
    'Set Error': props<{ error: SnackBarErrorType }>(),
    'Reset Error': emptyProps()
  },
});

