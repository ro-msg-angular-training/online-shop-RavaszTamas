import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIsAdmin } from 'src/app/store/selectors/auth.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {

    this.store.pipe(select(selectIsAdmin)).subscribe(result => this.isAdmin = result)
  }

  isAdmin?: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(select(selectIsAdmin), map((result) => {
      if (result)
        return true;
      return false;
    }))
  }

  checkLogin(url: string): true | UrlTree {
    if (this.isAdmin) { return true; }

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }

}
