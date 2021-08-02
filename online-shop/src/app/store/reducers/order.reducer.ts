import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ShoppingCartItem } from "src/app/shared/models/ShoppingCartItem.model";
import { orderActionTypes } from "../actions/order.actions";

export interface OrderCartState extends EntityState<ShoppingCartItem> {
    message:string;
    isOrderLoading:boolean;
}

export const adapter: EntityAdapter<ShoppingCartItem> = createEntityAdapter<ShoppingCartItem>({
    selectId: (item: ShoppingCartItem) => item.productId
});

export const initialOrderState = adapter.getInitialState({
    message:'',
    isOrderLoading:false
})


export const orderReducer = createReducer(
    initialOrderState,
    on(orderActionTypes.createOrder, (state) => {
        return {...state,isOrderLoading:true};
    }),
    on(orderActionTypes.createOrderFail, (state) => {
        return {...state,isOrderLoading:false,message:"Order not added"};
    }),
    on(orderActionTypes.createOrderSuccess, (state) => {
        return adapter.removeAll({...state,isOrderLoading:false,message:"Order successfully added"});
    }),
    on(orderActionTypes.addCartItem, (state, action) => {
        return adapter.addOne({ productId: action.productId, quantity: 1 }, state);
    }),
    on(orderActionTypes.removeCartItem, (state, action) => {
        return adapter.removeOne(action.productId, state);
    }),
    on(orderActionTypes.incrementItemQuantity, (state, action) => {
        const cartItem = state.entities[action.productId];
        if (cartItem !== undefined) {
            return adapter.setOne({...cartItem, quantity:cartItem.quantity+1}, state)
        }
        return state;
    }),
    on(orderActionTypes.decrementItemQuantity, (state, action) => {
        const cartItem = state.entities[action.productId];
        if (cartItem !== undefined && cartItem.quantity > 1) {
            return adapter.setOne({...cartItem, quantity:cartItem.quantity-1}, state)
        }
        return state;
    })

)

export const { selectIds: selectOrderIds, selectEntities: selectOrderEntities, selectAll: selectAllOrders, selectTotal: selectTotalOrders } = adapter.getSelectors();