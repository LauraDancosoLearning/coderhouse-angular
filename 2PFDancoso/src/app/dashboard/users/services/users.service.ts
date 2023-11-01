import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { USERS_MOCKED } from '../../../data/mockData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersList: User[] = [];
  private usersUpdated: EventEmitter<void> = new EventEmitter();
  public usersUpdated$: Observable<void> = this.usersUpdated.asObservable();
  
  public users: BehaviorSubject<User[]>;
  public users$:Observable<User[]> ;

  constructor(){
    //For testing porpuses
    this.usersList = USERS_MOCKED;

    this.users = new BehaviorSubject<User[]>(this.usersList);
    this.users$ = this.users.asObservable();
  }

  addUser(user: User){
    this.usersList.push({...user, id: new Date().getTime()});
    this.users.next(this.usersList);
    this.usersUpdated.emit();
  }

  deleteUser(id: number){
    this.usersList = this.usersList.filter(s=>s.id !== id);    
    this.users.next(this.usersList);
    this.usersUpdated.emit();
  }
  
  updateUser(userToUpdate: User){
    let user = this.usersList.find(s=> s.id === userToUpdate.id);
    
    const userIndex = this.usersList.findIndex((s=> s.id === userToUpdate.id));
    if(userIndex != -1){
      this.usersList[userIndex] = { ...user, ...userToUpdate};
      this.users.next(this.usersList);
      this.usersUpdated.emit();
    }
  }  
}
