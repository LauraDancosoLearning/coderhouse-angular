
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UrlService } from 'src/app/core/services/url/url.service';
import { ErrorFormService } from 'src/app/shared/services/errorForm.service';
import { gmailValidator } from 'src/app/shared/validators/gmailValidator';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnDestroy {

  form: FormGroup;
  passwordMinMaxLength = [6,8];
  title = "Academy Management System"
  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private urlService: UrlService,
    private router: Router,
    public errorFormService: ErrorFormService,
    public errorHandleService: ErrorHandlerService
  ) {
    this.form = this.formBuilder.group({
      email: formBuilder.control(null, [
        Validators.email,
        Validators.required,
        gmailValidator(),
      ]),
      password: formBuilder.control(
        null, [Validators.required, Validators.minLength(this.passwordMinMaxLength[0]), Validators.maxLength(this.passwordMinMaxLength[1])])
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login() {
    const { email, password } = this.form.value;
    this.authService.login(email, password)
      .subscribe(
      {
        next: user => {
          user == null ? this.form.setErrors({ loginError: true }) : this.router.navigate([this.urlService.previousDashboardGuardUrl.value ?? '/'])
        },
        error: err=> this.errorHandleService.showError()
      }
    );
  }
}
