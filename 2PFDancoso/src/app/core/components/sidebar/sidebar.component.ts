import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  routes: {link: string, name:string} [] = [
    {
      link: '/dashboard',
      name: 'Home'
    },
    {
      link: '/dashboard/students',
      name: 'Students'
    }
  ]
}
