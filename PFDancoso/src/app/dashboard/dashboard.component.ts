import { Component } from '@angular/core';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'apirest';
  showSidebar = true;
}
