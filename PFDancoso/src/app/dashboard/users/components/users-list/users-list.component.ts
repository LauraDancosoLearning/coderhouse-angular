import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserModalComponent } from '../add-edit-user-modal/add-edit-user-modal.component';
import { RolType } from '../../models/rol.enum';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../store/users.selectors';
import { UsersActions } from '../../store/users.actions';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnDestroy, OnInit {

  ngOnInit() {
    registerLocaleData(es)  ;
  }

  displayedColumns: string[] = ['fullName', 'email','dni', 'actions'];
  unsubscribe: Subject<void> = new Subject();
  users$: Observable<User[]>;
  
  @ViewChild(MatTable) public table?: MatTable<User>;

  constructor(public dialog: MatDialog, private store: Store){
    this.loadUsers();
    this.users$ = this.store.select(selectUsers).pipe(takeUntil(this.unsubscribe));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openEditUserModal(user: User) {
    this.dialog.open(AddEditUserModalComponent, {data: user, disableClose: true})
    .afterClosed().subscribe(user=>{
      if(!!user){
        this.store.dispatch(UsersActions.updateUser({user:user}));
      }
    });
  }

  deleteUser(userId: number){
    this.store.dispatch(UsersActions.deleteUser({userId}));
  }

  userIsAdmin(user: User){
    return user.roles?.some(r=>r === RolType.Admin);
  }

  loadUsers(){
    this.store.dispatch(UsersActions.loadUsers());
  }
}
