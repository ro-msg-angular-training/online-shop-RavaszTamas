import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { User } from "src/app/auth/models/User.model";
import { LoginCredentials } from "src/app/products/shared/models/LoginCredentials.model";

export const authLogin = createAction(
    '[Auth] Login',
    props<{credentials:LoginCredentials}>()
)

export const authSuccess = createAction(
    '[Auth] Login Successful',
    props<{user:User}>()
)

export const authFailed = createAction(
    '[Auth] Login Failed',
    props<{response:HttpErrorResponse}>()
)

export const authActionTypes ={
    authLogin,
    authSuccess,
    authFailed,
}
