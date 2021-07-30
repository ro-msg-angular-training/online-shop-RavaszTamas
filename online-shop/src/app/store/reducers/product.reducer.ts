import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/shared/models/Product.model";
import { productActionTypes } from "../actions/product.actions";


export interface ProductState extends EntityState<Product> {
    productsLoaded: boolean;
    loading: boolean;
    selectedProduct?: Product;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: (product: Product) => product.id
});

export const initialProductState = adapter.getInitialState({
    productsLoaded: false,
    loading: false
})

export const productReducer = createReducer(
    initialProductState,
    on(productActionTypes.loadProducts, (state) => {
        return { ...state, loading: true }
    }),
    on(productActionTypes.productsLoaded, (state, action) => {
        return adapter.setAll(
            action.products,
            { ...state, productsLoaded: true, loading: false }
        )
    }),
    on(productActionTypes.getProduct, (state) => {
        return { ...state, loading: true }
    }),
    on(productActionTypes.getProductLoaded, (state, action) => {
        return { ...state, selectedProduct: action.product, loading: false };
    }),
    on(productActionTypes.createProduct, (state) => {
        return { ...state, loading: true }
    }),
    on(productActionTypes.createProductSuccess, (state, action) => {
        return adapter.addOne(action.product, { ...state, loading: false })
    }),
    on(productActionTypes.createProductFailure, (state) => {
        return  { ...state, loading: false }
    }),
    on(productActionTypes.deleteProduct, (state) => {
        return { ...state, loading: true }
    }),
    on(productActionTypes.deleteProductSuccess, (state, action) => {
        return adapter.removeOne(action.productId, { ...state, loading: false });
    }),
    on(productActionTypes.deleteProductFailure, (state) => {
        return  { ...state, loading: false }
    }),
    on(productActionTypes.updateProduct, (state) => {
        return { ...state, loading: true }
    }),
    on(productActionTypes.updateProductSuccess, (state, action) => {
        return adapter.updateOne(action.update, { ...state, loading: false })
    }),
    on(productActionTypes.updateProductFailure, (state) => {
        return  { ...state, loading: false }
    }),

)

export const { selectIds: selectProductIds, selectEntities: selectProductEntities, selectAll: selectAllProducts, selectTotal: selectTotalProducts } = adapter.getSelectors();