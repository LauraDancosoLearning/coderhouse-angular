import { Component, OnDestroy } from '@angular/core';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  userName: string = '';

  private unsuscribe = new Subject<void>();
  constructor(private authService: AuthService) {
    this.authService.user$
      .pipe(takeUntil(this.unsuscribe), filter(u => u != null), map((u) => u?.name ?? ''))
      .subscribe(n => this.userName = n);
  }

  ngOnDestroy(): void {
    this.unsuscribe.next();
    this.unsuscribe.complete();
  }
}
