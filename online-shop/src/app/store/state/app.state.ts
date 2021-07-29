import { EntityState } from "@ngrx/entity";
import {RouterReducerState} from "@ngrx/router-store"
import { Product } from "src/app/products/shared/models/Product.model";
import { ShoppingCartItem } from "src/app/products/shared/models/ShoppingCartItem.model";
import { initialOrderState, OrderCartState } from "../reducers/order.reducer";
import { initialProductState, ProductState } from "../reducers/product.reducer";
import { AuthState, initialAuthState } from "./auth.state";

export interface AppState{
    orders: EntityState<ShoppingCartItem>;
    product: EntityState<Product>;
    auth: AuthState
}

export const initialAppState:AppState = {
    orders: initialOrderState,
    product: initialProductState,
    auth: initialAuthState
}

export function getInitialState(): AppState{
    return initialAppState;
}