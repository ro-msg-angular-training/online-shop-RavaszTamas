import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/auth/models/User.model";
import { ShoppingCartItem } from "src/app/products/shared/models/ShoppingCartItem.model";
import { authActionTypes } from "../actions/auth.actions";
import { initialAuthState } from "../state/auth.state";



export const authReducer = createReducer(
    initialAuthState,
    on(authActionTypes.authSuccess, (state, action) => {
        console.log("authenticated")
        return {
            ...state,
            user: action.user,
            hasAuthenticationError: false,
            message: '',
            isAuthenticated: true
        }
    }),
    on(authActionTypes.authFailed, (state, action) => {
        return {
            ...state,
            user: null,
            hasAuthenticationError: true,
            message: action.response.error,
            isAuthenticated: false
        }
    })
)