import { Component } from '@angular/core';
import { ROUTER_LINKS } from 'src/app/data/routes';
import { AuthService } from '../../services/auth/auth.service';
import { RolType } from 'src/app/dashboard/users/models/rol.enum';
import { Store } from '@ngrx/store';
import { Observable, concatMap, of } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  routes: {link: string, name:string, roles: RolType[], disabled: boolean} [];

  
  constructor(public authService: AuthService, private store: Store){
    this.routes =  ROUTER_LINKS.filter(r=> !r.disabled);
    this.store.select(selectAuthUser).subscribe(user=>{
      this.routes = ROUTER_LINKS.map(route=> {
        route.disabled = !this.authService.userHasAccess(user, route.roles);
        return route;
      }).filter(r=>!r.disabled);
    })
    
  }

  logout(){
    this.authService.logout();
  }
}
