import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState, selectAllProducts, selectProductEntities } from "../reducers/product.reducer";

export const productsFeatureSelector = createFeatureSelector<ProductState>('products');

export const getAllProducts = createSelector(
    productsFeatureSelector,
    selectAllProducts
)

export const getSelectedProduct = createSelector(
    productsFeatureSelector,
    state => state.selectedProduct
)

export const isLoading = createSelector(
    productsFeatureSelector,
    (state) => state.loading
)

export const getProductEntities = createSelector(
    productsFeatureSelector,
    selectProductEntities
)
  
export const areProductsLoaded = createSelector(
    productsFeatureSelector,
    state => state.productsLoaded
)
