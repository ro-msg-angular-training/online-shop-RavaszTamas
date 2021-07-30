import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { authActionTypes } from "../actions/auth.actions";


@Injectable()
export class AuthEffects {

    constructor(private authenticationService: AuthService, private actions$: Actions, private router: Router) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActionTypes.authLogin),
            switchMap((action) => this.authenticationService.login(action.credentials)
                .pipe(
                    map((user) => authActionTypes.authSuccess({ user })),
                    catchError((response) => of(authActionTypes.authFailed({ response })))
                )
            ),
        )
    )

    navigateToProfile$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authActionTypes.authSuccess),
                map((action) => action),
                tap(() => this.router.navigate([`/products`]))
            ),
        { dispatch: false }
    );

}
