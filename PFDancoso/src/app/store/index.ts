import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { authFeatureKey } from './auth/authFeatureKey';

export interface AppState {
  [authFeatureKey]: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
};