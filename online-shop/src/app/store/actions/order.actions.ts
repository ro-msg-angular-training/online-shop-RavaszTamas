import { createAction, props } from "@ngrx/store";
import { ShoppingCartItem } from "src/app/shared/models/ShoppingCartItem.model";

export const addCartItem = createAction(
    '[Shopping Cart] Add Item',
    props<{productId:number}>()
)


export const createOrderSuccess = createAction(
    '[Shopping Cart] Order Success'
)

export const createOrderFail = createAction(
    '[Shopping Cart] Order Fail'
)

export const removeCartItem = createAction(
    '[Shopping Cart] Remove Item',
    props<{productId:number}>()
)


export const incrementItemQuantity = createAction(
    '[Shopping Cart] Increment Item Quantity',
    props<{productId:number}>()
)

export const decrementItemQuantity = createAction(
    '[Shopping Cart] Decrement Item Quantity',
    props<{productId:number}>()
)

export const getShoppingCartItems = createAction(
    '[Shopping Cart] Get Cart Items',
    props<{cartItems:ShoppingCartItem[]}>()
)

export const createOrder = createAction(
    '[Shopping Cart] Create Order'
    )

export const orderActionTypes ={
    addCartItem,
    createOrderSuccess,
    createOrderFail,
    removeCartItem,
    incrementItemQuantity,
    decrementItemQuantity,
    createOrder
}
