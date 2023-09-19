import { Component } from '@angular/core';
import { Hashs } from './navbarHashs.enum';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  hashs = Hashs;

  getLocationHash(path: Hashs){
    return window.location.hash == path
  }

}
