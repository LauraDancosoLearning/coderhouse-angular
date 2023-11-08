import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { USERS_MOCKED } from '../../../data/mockData';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersList: User[] = [];
  private usersUpdated: EventEmitter<void> = new EventEmitter();
  public usersUpdated$: Observable<void> = this.usersUpdated.asObservable();
  
  private users: BehaviorSubject<User[]>;
  public users$:Observable<User[]> ;

  constructor(private httpClient: HttpClient){
    this.users = new BehaviorSubject<User[]>([]);
    this.users$ = this.getUsers();
  }

  getUsers(){
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users`).pipe(tap(users=>this.usersList = users))
  }

  addUser(user: User){
    this.usersList.push({...user, id: new Date().getTime()});
    this.users.next(this.usersList);
    this.usersUpdated.emit();
  }

  deleteUser(id: number){
    this.usersList = this.usersList.filter(s=>s.id !== id); 
    return this.httpClient.delete(`${environment.baseUrl}/users/${id}`).pipe(tap(()=>this.users$ = this.getUsers()))
  }
  
  updateUser(userToUpdate: User){
    let user = this.usersList.find(s=> s.id === userToUpdate.id);
    const userIndex = this.usersList.findIndex((s=> s.id === userToUpdate.id));
    if(userIndex != -1){
     this.httpClient.put(`${environment.baseUrl}/users/${userToUpdate.id}`, userToUpdate)
    }
  }  
}
