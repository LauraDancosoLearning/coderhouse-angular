import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUpdated: EventEmitter<void> = new EventEmitter();
  public usersUpdated$: Observable<void> = this.usersUpdated.asObservable();

  private users!: BehaviorSubject<User[]>;
  public users$!: Observable<User[]>;

  constructor(private httpClient: HttpClient) {
    this.users = new BehaviorSubject<User[]>([]);
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.httpClient.get<User[]>(`${environment.baseUrl}/users`);
  }

  addUser(user: User) {
    return this.httpClient.post(`${environment.baseUrl}/users`, { ...user, token: new Date().getTime() }).pipe(
      tap(() => {
        this.getUsers();
        this.usersUpdated.emit();
      })
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/users/${id}`).pipe(tap(() => {
      this.getUsers();
      this.usersUpdated.emit();
    }))
  }

  updateUser(userToUpdate: User) {
    return this.httpClient.put(`${environment.baseUrl}/users/${userToUpdate.id}`, userToUpdate).pipe(tap(() => {
      this.getUsers();
      this.usersUpdated.emit();
    }))
  }
}
