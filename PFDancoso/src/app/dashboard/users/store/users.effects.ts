import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { UsersActions } from './users.actions';
import { UsersService } from '../services/users.service';
import { ErrorActions } from 'src/app/store/error/error.actions';
import { of } from 'rxjs';


@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsersActions.loadUsers),
      concatMap(() =>
        this.usersService.getUsers().pipe(
          map(data => UsersActions.loadUsersSuccess({ data })),
          catchError(error => of(ErrorActions.setError( { error : { actionType: UsersActions.loadUsers.type, message: error?.message ?? '' }}))))
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsersActions.addUser),
      concatMap((action) =>
        this.usersService.addUser(action.user, action.admin).pipe(
          map(() => UsersActions.loadUsers()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: UsersActions.loadUsers.type, message: error?.message ?? '' }}))))
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      concatMap((action) =>
        this.usersService.deleteUser(action.userId).pipe(
          map(() => UsersActions.loadUsers()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: UsersActions.loadUsers.type, message: error?.message ?? '' }}))))
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsersActions.updateUser),
      concatMap((action) =>
        this.usersService.updateUser(action.user).pipe(
          map(() => UsersActions.loadUsers()),
          catchError(error => of(ErrorActions.setError( { error : { actionType: UsersActions.loadUsers.type, message: error?.message ?? '' }}))))
      )
    );
  });


  constructor(private actions$: Actions, private usersService: UsersService) {}
}
