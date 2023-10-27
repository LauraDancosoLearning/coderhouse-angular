import { Component } from '@angular/core';
import { ROUTER_LINKS } from 'src/app/data/routes';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  routes: {link: string, name:string} [] = ROUTER_LINKS;
}
