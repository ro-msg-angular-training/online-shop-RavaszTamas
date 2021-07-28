import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { httpOptions } from '../products/shared/constants';
import { User } from './models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = "http://localhost:3000/login"
  isLoggedIn = false;
  user:User|null = null;
  redirectUrl: string = "/products";

  constructor(private http: HttpClient, private router: Router) { }

  login(userName:string, password:string): Observable<any> {
    return this.http.post(this.loginUrl,{username:userName, password:password},httpOptions)
  }
  logout(): void {
    this.isLoggedIn = false;
  }
  setUser(user:User){
    this.user = user;
  }
  getUSer():User|null{
    return this.user
  }
  hasRole(role: string) {
    if(this.user == null)
      return false;
    return this.user.roles.filter(item => item === role).length > 0;
  }
  sendToRedirectUrl() {
    if(this.isLoggedIn)
      this.router.navigateByUrl(this.redirectUrl);
  }

}
