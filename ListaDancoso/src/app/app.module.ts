import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { GradeStateDirective } from './directives/grade-state.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StudentsListComponent,
    GradeStateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
