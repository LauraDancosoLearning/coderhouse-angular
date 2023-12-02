import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from 'src/app/dashboard/users/models/user.model';


export interface AuthState {
  authUser: User | null;
}

const initialState: AuthState = {
  authUser: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loadAuthUser, (state, { user }) => ({
    ...state,
    authUser: user,
  })),

  on(AuthActions.resetAuthUser, (state) =>({
    ...state,
    authUser: null
  }))
);


