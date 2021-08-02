import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
import { ProductsService } from "src/app/services/product-service/products.service";
import { productActionTypes } from "../actions/product.actions";

@Injectable()
export class ProductEffects {

    constructor(
        private productService: ProductsService,
        private actions$: Actions,
        private router: Router,
        private _snackBar: MatSnackBar
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.loadProducts),
            concatMap(() => this.productService.getProducts()),
            map(products => productActionTypes.productsLoaded({ products }))
        )
    );

    getProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.getProduct),
            concatMap((action) => this.productService.getProduct(action.productId)),
            map(product => productActionTypes.getProductLoaded({ product }))
        )
    );


    createProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.createProduct),
            switchMap((action) => this.productService.createProduct(action.product)
                .pipe(
                    map(product => productActionTypes.createProductSuccess({ product })),
                    catchError((response) => of(productActionTypes.createProductFailure({ response })))
                )
            ),
        ),
    );

    createProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.createProductSuccess),
            tap(() => {
                this._snackBar.open("Product created", "Dismiss", { duration: 2000 })
                this.router.navigateByUrl('/products')
            })
        ),
        { dispatch: false }
    );

    createProductFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.createProductFailure),
            tap(() => {
                this._snackBar.open("Failed to create product", "Dismiss", { duration: 2000 })
                this.router.navigateByUrl('/products')
            })
        ),
        { dispatch: false }
    );


    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.deleteProduct),
            switchMap((action) => this.productService.deleteProduct(action.productId)
                .pipe(map(() => action.productId),
                    map(productId => productActionTypes.deleteProductSuccess({ productId })),
                    catchError((response) => of(productActionTypes.deleteProductFailure({ response })))
                )),
        ),
    );

    deleteProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.deleteProductSuccess),
            tap(() => {
                this._snackBar.open("Product deleted", "Dismiss", { duration: 2000 })
                this.router.navigateByUrl('/products')
            })
        ),
        { dispatch: false }
    );

    deleteProductFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.deleteProductFailure),
            tap(() => {
                this._snackBar.open("Failed to delete product", "Dismiss", { duration: 2000 })
                this.router.navigateByUrl('/products')
            })
        ),
        { dispatch: false }
    );


    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.updateProduct),
            switchMap((action) => this.productService.updateProduct(action.update.id, action.update.changes)
                .pipe(map(() => action.update),
                    map(update => productActionTypes.updateProductSuccess({ update })),
                    catchError((response) => of(productActionTypes.updateProductFailure({ response })))
                )
            ),
        ),
    )

    updateProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.updateProductSuccess),
            tap(() => {
                this._snackBar.open("Product updated", "Dismiss", { duration: 2000 })
                this.router.navigate(['/products'])
            })
        ),
        { dispatch: false }


    )

    updateProductFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.updateProductFailure),
            tap(() => {
                this._snackBar.open("Failed to update updated", "Dismiss", { duration: 2000 })
                this.router.navigate(['/products'])
            })
        ),
        { dispatch: false }


    )


}

