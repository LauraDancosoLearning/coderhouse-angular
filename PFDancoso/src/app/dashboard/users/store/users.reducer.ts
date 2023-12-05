import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { User } from '../models/user.model';
import { SnackBarErrorType } from 'src/app/shared/models/snackbarError.model';

export const usersFeatureKey = 'users';

export interface State {
  users: User[]
}

export const initialState: State = {
  users: []
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, action) => ({...state, users: action.data}))
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});

