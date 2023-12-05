import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Add User': props<{user: User, admin?:boolean}>(),
    'Delete User': props<{userId: number}>(),
    'Update user': props<{user: User}>()
  }
});