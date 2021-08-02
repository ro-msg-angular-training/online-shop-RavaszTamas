import { EntityState } from "@ngrx/entity";
import { Product } from "src/app/shared/models/Product.model";
import { ShoppingCartItem } from "src/app/shared/models/ShoppingCartItem.model";
import { initialOrderState } from "../reducers/order.reducer";
import { initialProductState } from "../reducers/product.reducer";
import { AuthState, initialAuthState } from "./auth.state";

export interface AppState {
    orders: EntityState<ShoppingCartItem>;
    products: EntityState<Product>;
    auth: AuthState
}

export const initialAppState: AppState = {
    orders: initialOrderState,
    products: initialProductState,
    auth: initialAuthState
}

export function getInitialState(): AppState {
    return initialAppState;
}