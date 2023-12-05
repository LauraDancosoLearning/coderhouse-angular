import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './shared/services/error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private errorService: ErrorHandlerService){}

  ngOnInit(): void {
    this.errorService.handleErrors();
  }
}
