import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input({required: true}) menuOpened?: boolean;
  @Output() menuTriggered: EventEmitter<void> = new EventEmitter();

  constructor(public authService: AuthService){
  }

  title = "Academy Management System"

  logout(){
    this.authService.logout();
  }
}
