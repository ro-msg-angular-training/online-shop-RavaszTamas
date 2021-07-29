import { ActionReducerMap, combineReducers } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { authReducer } from "./auth.reducers";
import { orderReducer } from "./order.reducer";
import { productReducer } from "./product.reducer";

//don't use combineReducers
export const appReducer ={
    auth:authReducer,
    orders:orderReducer,
    products:productReducer
}