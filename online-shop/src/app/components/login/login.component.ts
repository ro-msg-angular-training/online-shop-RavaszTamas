import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LoginCredentials } from 'src/app/shared/models/LoginCredentials.model';
import { authLogin } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/state/app.state';
import { selectHasAuthFailed } from 'src/app/store/selectors/auth.selectors';
import { MyErrorStateMatcher } from 'src/app/shared/matchers/MyErrorStateMatcher';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  matcher = new MyErrorStateMatcher();
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required])
  loginFormGroup = new FormGroup({
    username: this.usernameControl,
    password: this.passwordControl,
  })

  authFailed$ = this.store.pipe(select(selectHasAuthFailed))

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }
  onSubmit() {
    const credentials: LoginCredentials = this.loginFormGroup.value;
    console.log("starting dispatch with credentials",credentials);
    this.store.dispatch(authLogin({ credentials }))
  }
}
