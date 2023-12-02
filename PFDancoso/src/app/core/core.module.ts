import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { SidebarModule } from './components/sidebar/sidebar.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    SidebarModule
  ],
  exports: [
    ToolbarModule,
    SidebarModule
  ]
})
export class CoreModule { }
