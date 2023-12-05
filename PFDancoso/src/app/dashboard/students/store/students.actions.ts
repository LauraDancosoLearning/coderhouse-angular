import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../models/student.model';

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: Student[] }>(),
    'Add Student': props<{student: Student}>(),
    'Delete Student': props<{studentId: number}>(),
    'Update Student': props<{student: Student}>(),
    'Load Top Students': props<{topNumber: number}>(),
    'Load Top Students Success': props<{ data: string[] }>(),
  }
});
