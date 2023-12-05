import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { authFeatureKey } from './auth/authFeatureKey';
import { errorFeatureKey } from './error/errorFeatureKey';
import { errorReducer, ErrorState } from './error/error.reducer';

export interface AppState {
  [authFeatureKey]: AuthState;
  [errorFeatureKey]: ErrorState;
}

export const appReducer: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
  [errorFeatureKey]: errorReducer
};