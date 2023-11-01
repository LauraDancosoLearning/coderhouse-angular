import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserModalComponent } from '../add-edit-user-modal/add-edit-user-modal.component';

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
  
  @ViewChild(MatTable) public table?: MatTable<User>;

  constructor(public usersService: UsersService, public dialog: MatDialog){
    this.usersService.usersUpdated$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(()=>this.renderTable())
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  renderTable(){
    this.table?.renderRows();
  }

  openEditUserModal(user: User) {
    this.dialog.open(AddEditUserModalComponent, {data: user, disableClose: true})
    .afterClosed().subscribe(s=>{
      if(!!s){
        this.usersService.updateUser(s);
      }
    });
  }
}
