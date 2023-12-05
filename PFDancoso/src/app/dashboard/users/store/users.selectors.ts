import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectUsers = createSelector(selectUsersState, (state)=> state.users);