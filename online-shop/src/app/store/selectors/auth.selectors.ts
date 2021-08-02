import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { AuthState } from "../state/auth.state";

const authenticationState = (state: AppState) => state.auth

export const selectIsAuthenticated = createSelector(
    authenticationState,
    (state) => state.isAuthenticated
)

export const selectUser = createSelector(
    authenticationState,
    (state:AuthState) =>  state.user
)

export const selectMessage = createSelector(
    authenticationState,
    (state) => state.message
)

export const selectHasAuthFailed = createSelector(
    authenticationState,
    (state) => state.hasAuthenticationError
)

export const selectIsAdmin = createSelector(
    authenticationState,
    (state) => state.user?.roles.includes('admin')
)

export const selectIsCustomer = createSelector(
    authenticationState,
    (state) => state.user?.roles.includes('customer')
)

export const selectIsAdminOrCustomer = createSelector(
    authenticationState,
    (state) => state.user?.roles.includes('customer') ||  state.user?.roles.includes('admin')
)


export const selectIsUser = createSelector(
    authenticationState,
    (state) => state.user?.roles.includes('user')
)



