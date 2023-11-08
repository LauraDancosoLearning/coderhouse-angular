import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap, map } from 'rxjs';
import { User } from 'src/app/dashboard/users/models/user.model';
import { USERS_MOCKED } from 'src/app/data/mockData';
import { RolType } from '../../../dashboard/users/models/rol.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.user.asObservable();

  constructor(private router: Router) { }

  login(email: string, token: string){
    const user = USERS_MOCKED.find(u=>u.email == email);
    return of(user ?? null).pipe(tap((result)=> this.user.next(result)));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/']);
  }

  userHasRol$(rol: RolType): Observable<boolean>{
    return this.user$.pipe(map(u=> u?.roles.includes(rol) ?? false));
  }

  userHasAnyRol(roles: RolType[]){
    return this.user.value?.roles.some(r=> roles.includes(r));
  }
}
