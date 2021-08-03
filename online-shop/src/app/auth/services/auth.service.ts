import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { httpOptions } from 'src/app/shared/constants';
import { LoginCredentials } from 'src/app/shared/models/LoginCredentials.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.baseUrl + "/login";

  constructor(private http: HttpClient, private router: Router) { }

  login(loginCredentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(this.loginUrl, loginCredentials, httpOptions);
  }

}
