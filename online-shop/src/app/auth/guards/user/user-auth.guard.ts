import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectUser } from 'src/app/store/selectors/auth.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {


  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(selectUser),
      map((user) => {
        if (user) {
          if (state.url === '/login')
            this.router.navigate([`/products`]);
          return true;
        } else {
          if (state.url === '/login')
            return true;
          this.router.navigate([`/login`]);
          return false;
        }
      })
    );
  }


}
