import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from 'src/app/dashboard/users/models/user.model';
import { RolType } from '../../../dashboard/users/models/rol.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { selectAuthUser, selectUserIsAdmin, selectUserRoles } from 'src/app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User | null> = this.store.select(selectAuthUser);
  public userIsAdmin$:Observable<boolean> = this.store.select(selectUserIsAdmin)

  constructor(private router: Router, private httpClient: HttpClient, private store: Store) { }

  login(email: string, password: string): Observable<User | null>{
    return this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?email=${email}&password=${password}`
      )
      .pipe(
        map((users: User[])=>{
          if(users?.length==0){
            this.resetUser();
            return null;
          } else{
            const authUser = users[0];
            this.setUser(authUser);
            localStorage.setItem('token', authUser.token);
            localStorage.setItem('id', authUser.id?.toString() ?? "");
            return authUser;
          }
        })
      );
  }

  logout(){
    this.resetUser();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  userHasAccess(user: User | null, roles: RolType[]): boolean{
    return user?.roles?.some(r=> roles.includes(r)) ?? false;
  }

  userHasRol$(rol: RolType): Observable<boolean>{
    return this.user$.pipe(map(u=> u?.roles.includes(rol) ?? false));
  }

  userAuthenticated(){
    if(localStorage.getItem('id') == null) return of(false);
    return this.httpClient
      .get<User>(
        `${environment.baseUrl}/users/${localStorage.getItem('id')}`
      ).pipe(
        map(u=>{
          const isAuthenticated = u?.token ? u.token == localStorage.getItem('token') : false;
          if(isAuthenticated) this.setUser(u);
          return isAuthenticated;
        })
      );
  }

  setUser(user: User){
    this.store.dispatch(AuthActions.loadAuthUser({user: user}));
  }

  resetUser(){
    this.store.dispatch(AuthActions.resetAuthUser());
  }
}