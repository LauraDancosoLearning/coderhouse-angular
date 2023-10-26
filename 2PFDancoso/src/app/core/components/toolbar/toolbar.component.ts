import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input({required: true}) menuOpened?: boolean;
  @Output() menuTriggered: EventEmitter<void> = new EventEmitter();

  title = "Academy Management System"
}
