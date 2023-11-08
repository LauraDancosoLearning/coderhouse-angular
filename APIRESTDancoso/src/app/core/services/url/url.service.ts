import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  previousDashboardGuardUrl = new BehaviorSubject<string | null>(null);
  
  constructor() { }
}
