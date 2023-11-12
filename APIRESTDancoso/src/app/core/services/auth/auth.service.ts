import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap, of } from 'rxjs';
import { User } from 'src/app/dashboard/users/models/user.model';
import { RolType } from '../../../dashboard/users/models/rol.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.user.asObservable();

  constructor(private router: Router, private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<User | null>{
    return this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?email=${email}&password=${password}`
      )
      .pipe(
        map((users: User[])=>{
          if(users?.length==0){
            this.user.next(null);
            return null;
          } else{
            const authUser = users[0];
            this.user.next(authUser);
            localStorage.setItem('token', authUser.token);
            localStorage.setItem('id', authUser.id?.toString() ?? "");
            return authUser;
          }
        })
      );
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  userHasRol$(rol: RolType): Observable<boolean>{
    return this.user$.pipe(map(u=> u?.roles.includes(rol) ?? false));
  }

  userHasAnyRol(roles: RolType[]){
    return this.user.value?.roles.some(r=> roles.includes(r));
  }

  userAuthenticated(){
    if(localStorage.getItem('id') == null) return of(false);
    return this.httpClient
      .get<User>(
        `${environment.baseUrl}/users/${localStorage.getItem('id')}`
      ).pipe(
        map(u=>{
          const isAuthenticated = u?.token ? u.token === localStorage.getItem('token') : false;
          if(isAuthenticated) this.user.next(u);
          return isAuthenticated;
        })
      );
  }
}
