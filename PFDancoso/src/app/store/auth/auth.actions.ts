import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { authFeatureKey } from './authFeatureKey';
import { User } from 'src/app/dashboard/users/models/user.model';

export const AuthActions = createActionGroup({
  source: authFeatureKey,
  events: {
    'Load Auth User': props<{ user: User }>(),
    'Reset Auth User': emptyProps(),
  },
});

