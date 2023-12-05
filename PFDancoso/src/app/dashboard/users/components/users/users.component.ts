import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserModalComponent } from '../add-edit-user-modal/add-edit-user-modal.component';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../store/users.actions';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(public dialog: MatDialog,
    private store: Store) {
    }
  
  openAddUserModal() {
    this.dialog.open(AddEditUserModalComponent, {
      disableClose: true
    })
    .afterClosed().subscribe(user=>{
      if(!!user){
        this.store.dispatch(UsersActions.addUser({user: user}))
      }
    });
  }
}
