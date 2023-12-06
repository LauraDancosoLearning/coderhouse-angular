import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models/enrollment.model';

export const EnrollmentsActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Enrollments': props<{courseId?: number}>(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Abm Success': emptyProps(),
    'Add Enrollments': props<{enrollments: Enrollment[]}>(),
    'Delete Enrollment': props<{enrollmentId: number}>(),
    'Update Enrollment': props<{enrollment: Enrollment}>(),
    'Unenroll': props<{courseId: number, studentId?: number}>(),
  }
});
