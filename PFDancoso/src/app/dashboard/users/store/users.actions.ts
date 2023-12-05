import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { SnackBarErrorType } from 'src/app/shared/models/snackbarError.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    // 'Load Users Failure': props<{ error: SnackBarErrorType}>(),
    'Add User': props<{user: User, admin?:boolean}>(),
    'Delete User': props<{userId: number}>(),
    'Update user': props<{user: User}>(),
    // 'Add User Failure': props<{ error: SnackBarErrorType }>(),
    // 'Delete User Failure': props<{ error: SnackBarErrorType }>(),
    // 'Update user Failure': props<{ error: SnackBarErrorType }>(),
  }
});

export const UserActionErrors = {
}
