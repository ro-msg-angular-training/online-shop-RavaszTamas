import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/shared/matchers/MyErrorStateMatcher';
import { LoginCredentials } from 'src/app/shared/models/LoginCredentials.model';
import { authLogin } from 'src/app/store/actions/auth.actions';
import { selectHasAuthFailed } from 'src/app/store/selectors/auth.selectors';
import { isLoading } from 'src/app/store/selectors/product.selectors';
import { AppState } from 'src/app/store/state/app.state';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  matcher = new MyErrorStateMatcher();
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  loginFormGroup = new FormGroup({
    username: this.usernameControl,
    password: this.passwordControl,
  })
  loading$: Observable<boolean> = this.store.pipe(select(isLoading));

  authFailed$ = this.store.pipe(select(selectHasAuthFailed));

  constructor(private store: Store<AppState>) { }

  onSubmit(): void {
    const credentials: LoginCredentials = this.loginFormGroup.value;
    this.store.dispatch(authLogin({ credentials }));
  }
}
