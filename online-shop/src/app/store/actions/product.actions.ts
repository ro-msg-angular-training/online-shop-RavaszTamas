import { HttpErrorResponse } from "@angular/common/http";
import { UpdateNum } from "@ngrx/entity/src/models";
import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/models/Product.model";

export const loadProducts = createAction(
    '[Products List] Load Products via service'
);

export const productsLoaded = createAction(
    '[Products Effect] Load Products Successfully',
    props<{products:Product[]}>()
);

export const productsLoadFail= createAction(
    '[Products Effect] Load Products Failure',
    props<{error:HttpErrorResponse}>()
);

export const getProduct = createAction(
    '[Products Effect] Get a Product',
    props<{productId:number}>()
)


export const getProductSuccess = createAction(
    '[Products Effect] Get a Product Success',
    props<{productId:number}>()
)

export const getProductFailure = createAction(
    '[Products Effect] Get a Product Failure',
    props<{error:HttpErrorResponse}>()
)


export const getProductLoaded = createAction(
    '[Products Effect] Get a Product Successfully',
    props<{product:Product}>()
)

export const createProduct = createAction(
    '[Create Product Component] Create Product',
    props<{product:Product}>()
)

export const createProductSuccess = createAction(
    '[Create Product Component] Create Product Success',
    props<{product:Product}>()
)

export const createProductFailure = createAction(
    '[Create Product Component] Create Product Failure' ,
    props<{response:HttpErrorResponse}>()
)

export const deleteProduct = createAction(
    '[Product Details Component] Delete Product',
    props<{productId:number}>()
)

export const deleteProductSuccess = createAction(
    '[Product Details Component] Delete Product Success',
    props<{productId:number}>()
)

export const deleteProductFailure = createAction(
    '[Product Details Component] Delete Product Failure',
    props<{response:HttpErrorResponse}>()
)


export const updateProduct = createAction(
    '[Product Details Component] Update Product',
    props<{update: UpdateNum<Product>}>()
)

export const updateProductSuccess = createAction(
    '[Product Details Component] Update Product Success',
    props<{update: UpdateNum<Product>}>()
)

export const updateProductFailure = createAction(
    '[Product Details Component] Update Product Failure',
    props<{response:HttpErrorResponse}>()
)


export const productActionTypes = {
    loadProducts,
    productsLoaded,
    getProduct,
    getProductLoaded,
    createProduct,
    createProductSuccess,
    createProductFailure,
    deleteProduct,
    deleteProductSuccess,
    deleteProductFailure,
    updateProduct,
    updateProductSuccess,
    updateProductFailure,

}