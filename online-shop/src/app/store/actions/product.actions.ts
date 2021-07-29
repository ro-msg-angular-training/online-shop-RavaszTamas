import { UpdateNum } from "@ngrx/entity/src/models";
import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/products/shared/models/Product.model";

export const loadProducts = createAction(
    '[Products List] Load Products via service'
);

export const productsLoaded = createAction(
    '[Products Effect] Load Products Successfully',
    props<{products:Product[]}>()
);


export const getProduct = createAction(
    '[Products Effect] Get a Product',
    props<{productId:number}>()
)

export const getProductLoaded = createAction(
    '[Products Effect] Get a Product Successfully',
    props<{product:Product}>()
)

export const createProduct = createAction(
    '[Create Product Component] Create Product',
    props<{product:Product}>()
)

export const deleteProduct = createAction(
    '[Product Details Component] Delete Product',
    props<{productId:number}>()
)

export const updateProduct = createAction(
    '[Product Details Component] Update Product',
    props<{update: UpdateNum<Product>}>()
)

export const productActionTypes = {
    loadProducts,
    productsLoaded,
    getProduct,
    getProductLoaded,
    createProduct,
    deleteProduct,
    updateProduct
}