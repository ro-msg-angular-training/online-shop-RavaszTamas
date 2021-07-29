import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/products/shared/models/Product.model";
import { productActionTypes } from "../actions/product.actions";


export interface ProductState extends  EntityState<Product> {
    productsLoaded: boolean;
    selectedProduct?:Product;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: (product:Product) => product.id
});

export const initialProductState = adapter.getInitialState({
    productsLoaded:false,
})

export const productReducer = createReducer(
    initialProductState,
    on(productActionTypes.productsLoaded, (state,action) => {
        return adapter.setAll(
            action.products,
            {...state, productsLoaded:true}
        )
    }),
    on(productActionTypes.getProductLoaded, (state,action) => {
        return {...state, selectedProduct:action.product};
    }),
    on(productActionTypes.createProduct, (state,action) =>{
        return adapter.addOne(action.product,state)
    }),
    on(productActionTypes.deleteProduct, (state,action)=>{
        return adapter.removeOne(action.productId,state);
    }),
    on(productActionTypes.updateProduct, (state,action)=>{
        return adapter.updateOne(action.update,state)
    })
)

export const { selectIds: selectProductIds, selectEntities: selectProductEntities, selectAll: selectAllProducts, selectTotal: selectTotalProducts} = adapter.getSelectors();