import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeStateDirective } from './directives/grade-state.directive';
import { FullnamePipe } from './pipes/fullname.pipe';
import { HeadingTitleDirective } from './directives/heading-title.directive';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [
    GradeStateDirective,
    FullnamePipe,
    HeadingTitleDirective,
  ],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [
    GradeStateDirective,
    FullnamePipe,
    HeadingTitleDirective,
  ]
})
export class SharedModule { }
