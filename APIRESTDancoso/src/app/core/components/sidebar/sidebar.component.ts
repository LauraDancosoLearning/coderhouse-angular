import { Component } from '@angular/core';
import { ROUTER_LINKS } from 'src/app/data/routes';
import { AuthService } from '../../services/auth/auth.service';
import { RolType } from 'src/app/dashboard/users/models/rol.enum';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  routes: {link: string, name:string, roles: RolType[]} [] = ROUTER_LINKS;
  constructor(public authService: AuthService){
  }

  getRoutes(){
    return this.routes.filter(r=> this.authService.userHasAnyRol(r.roles));
  }
}
