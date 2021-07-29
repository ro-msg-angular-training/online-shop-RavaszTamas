import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ShoppingCartItem } from "src/app/products/shared/models/ShoppingCartItem.model";
import { orderActionTypes } from "../actions/order.actions";

export interface OrderCartState extends EntityState<ShoppingCartItem> {}

export const adapter: EntityAdapter<ShoppingCartItem> = createEntityAdapter<ShoppingCartItem>({
    selectId: (item: ShoppingCartItem) => item.product.id
});

export const initialOrderState = adapter.getInitialState()


export const orderReducer = createReducer(
    initialOrderState,
    on(orderActionTypes.createOrderSuccess, (state) => {
        return adapter.removeAll(state);
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