import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorState } from './error.reducer';
import { errorFeatureKey } from './errorFeatureKey';
export const selectErrorState = createFeatureSelector<ErrorState>(errorFeatureKey);

export const selectError = createSelector(
  selectErrorState,
  (state) => state?.error
);