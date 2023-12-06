import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentsActions } from './enrollments.actions';
import { Enrollment } from '../models/enrollment.model';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  enrollments: Enrollment[]
}

export const initialState: State = {
  enrollments: []
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentsActions.loadEnrollments, state => state),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state, action) => ({...state, enrollments: action.data})),
);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});

