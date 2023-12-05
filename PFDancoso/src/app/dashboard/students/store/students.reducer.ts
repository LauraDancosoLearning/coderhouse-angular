import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentsActions } from './students.actions';
import { Student } from '../models/student.model';

export const studentsFeatureKey = 'students';

export interface State {
  students: Student[],
  topStudentsName: string[]
}

export const initialState: State = {
  students: [],
  topStudentsName: []
};

export const reducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, state => state),
  on(StudentsActions.loadStudentsSuccess, (state, action) => ({...state, students: action.data })),
  on(StudentsActions.loadTopStudentsSuccess, (state, action) => ({...state, topStudentsName: action.data }))
);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
});

