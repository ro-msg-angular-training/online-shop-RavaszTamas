import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ShoppingCartItem } from "src/app/shared/models/ShoppingCartItem.model";
import { orderActionTypes } from "../actions/order.actions";

export interface OrderCartState extends EntityState<ShoppingCartItem> {
    message:string
}

export const adapter: EntityAdapter<ShoppingCartItem> = createEntityAdapter<ShoppingCartItem>({
    selectId: (item: ShoppingCartItem) => item.product.id
});

export const initialOrderState = adapter.getInitialState({
    message:''
})


export const orderReducer = createReducer(
    initialOrderState,
    on(orderActionTypes.createOrderFail, (state) => {
        return {...state,message:"Order not added"};
    }),
    on(orderActionTypes.createOrderSuccess, (state) => {
        return adapter.removeAll({...state,message:"Order successfully added"});
    }),
    on(orderActionTypes.addCartItem, (state, action) => {
        return adapter.addOne({ product: action.product, quantity: 1 }, state);
    }),
    on(orderActionTypes.removeCartItem, (state, action) => {
        return adapter.removeOne(action.productId, state);
    }),
    on(orderActionTypes.incrementItemQuantity, (state, action) => {
        let cartItem = state.entities[action.productId];
        if (cartItem !== undefined) {
            return adapter.setOne({...cartItem, quantity:cartItem.quantity+1}, state)
        }
        return state;
    }),
    on(orderActionTypes.decrementItemQuantity, (state, action) => {
        let cartItem = state.entities[action.productId];
        if (cartItem !== undefined && cartItem.quantity > 1) {
            return adapter.setOne({...cartItem, quantity:cartItem.quantity-1}, state)
        }
        return state;
    })

)

export const { selectIds: selectOrderIds, selectEntities: selectOrderEntities, selectAll: selectAllOrders, selectTotal: selectTotalOrders } = adapter.getSelectors();