import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { OrderCartState, selectAllOrders, selectTotalOrders } from "../reducers/order.reducer";
import { AppState } from "../state/app.state";


function filerTruthy<T>(t: T | undefined): t is T {
    return !!t;
}

export const productsFeatureSelector = createFeatureSelector<OrderCartState>('orders');
const selectAppState = (state: AppState) => state;


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

export const getAllShoppingCartItemsWithProducts = createSelector(
    selectAppState,
    (state: AppState) => {
        return state.orders.ids.map((value) => +value).map((value) => {
            return { productId: value, quantity: state.orders.entities[value]!.quantity, product: state.products.entities[value] }
        })
    }
)



export const getAllProductsInCart = createSelector(
    getAllShoppingCartItems,
    (items) => items.map(item => item.product)
)

export const cartContainsItem = (id: number): MemoizedSelector<AppState, boolean, DefaultProjectorFn<boolean>> => createSelector(
    productsFeatureSelector,
    (state) => state.ids.findIndex(item => item === id) > -1


)