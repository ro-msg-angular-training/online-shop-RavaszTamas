import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderCartState, selectAllOrders, selectTotalOrders } from "../reducers/order.reducer";


export const productsFeatureSelector = createFeatureSelector<OrderCartState>('orders');

export const isOrderLoading = createSelector(
    productsFeatureSelector,
    state => state.isOrderLoading
)


export const getNumberOfItems = createSelector(
    productsFeatureSelector,
    selectTotalOrders
)

export const getAllShoppingCartItems = createSelector(
    productsFeatureSelector,
    selectAllOrders
)

export const getAllProductsInCart = createSelector(
    getAllShoppingCartItems,
    (items) => items.map(item => item.product)
)

export const cartContainsItem = (id: number) => createSelector(
    productsFeatureSelector,
    (state) => state.ids.findIndex(item => item == id) > -1
    
    
)