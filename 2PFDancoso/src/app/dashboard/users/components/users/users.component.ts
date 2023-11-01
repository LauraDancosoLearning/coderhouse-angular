import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserModalComponent } from '../add-edit-user-modal/add-edit-user-modal.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(public dialog: MatDialog,
    private usersService: UsersService) {}
  
  openAddUserModal() {
    this.dialog.open(AddEditUserModalComponent, {
      disableClose: true
    })
    .afterClosed().subscribe(s=>{
      if(!!s){
        this.usersService.addUser(s);
      }
    });
  }
}
