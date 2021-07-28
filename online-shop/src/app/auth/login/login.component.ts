import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(10)]),
  })


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.authService.login(this.loginFormGroup.value.username,this.loginFormGroup.value.password)
    .subscribe((result:User) =>{
      this.authService.isLoggedIn = true;
      this.authService.setUser(result)
      this.authService.sendToRedirectUrl();
    })
  }
}
