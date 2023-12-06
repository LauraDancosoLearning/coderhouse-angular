import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    MatButtonModule,
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
  ]
})
export class ToolbarModule { }
