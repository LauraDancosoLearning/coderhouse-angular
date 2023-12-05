import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUpdated: EventEmitter<void> = new EventEmitter();
  public usersUpdated$: Observable<void> = this.usersUpdated.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  getUsers() {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users`);
  }

  addUser(user: User, admin:boolean = false) {
    return this.httpClient.post(`${environment.baseUrl}/users`, { ...user, token: new Date().getTime(), password: admin? '123456' : '654321'});
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/users/${id}`);
  }

  updateUser(userToUpdate: User) {
    return this.httpClient.patch(`${environment.baseUrl}/users/${userToUpdate.id}`, userToUpdate);
  }
}
