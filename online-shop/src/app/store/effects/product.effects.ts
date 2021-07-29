import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs/operators";
import { ProductsService } from "src/app/products/shared/products.service";
import { productActionTypes } from "../actions/product.actions";

@Injectable()
export class ProductEffects {

    constructor(private productService: ProductsService, private actions$: Actions, private router: Router) { }

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
            concatMap((action) => this.productService.createProduct(action.product)),
            tap(() => this.router.navigateByUrl('/products'))
        ),
        { dispatch: false }
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.deleteProduct),
            concatMap((action) => this.productService.deleteProduct(action.productId)),
            tap(() => this.router.navigateByUrl('/products'))
        ),
        { dispatch: false }
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActionTypes.updateProduct),
            concatMap((action) => this.productService.updateProduct(action.update.id, action.update.changes)),
            tap((action) => this.router.navigate(['/products']))
        ),
        { dispatch: false }
    )

}

