import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { ShoppingCartService } from "src/app/services/cart-service/ShoppingCartService.service";
import { OrderRequest } from "src/app/shared/models/OrderRequest.model";
import { orderActionTypes } from "../actions/order.actions";
import { selectUser } from "../selectors/auth.selectors";
import { getAllShoppingCartItems } from "../selectors/order.selectors";
import { AppState } from "../state/app.state";


@Injectable()
export class OrderEffects {

    constructor(
        private shoppingCartService: ShoppingCartService,
        private actions$: Actions,
        private store: Store<AppState>,
        private _snackBar: MatSnackBar
    ) { }

    createOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActionTypes.createOrder),
            withLatestFrom(
                this.store.select(selectUser),
                this.store.select(getAllShoppingCartItems)
            ),
            switchMap(([action, user, cartItems]) => {
                const request: OrderRequest = {
                    customer: user?.username,
                    products: cartItems.map(item => { return { productId: item.product.id, quantity: item.quantity } })
                };
                return this.shoppingCartService.sendOrderRequest(request).pipe(
                    map((message) => orderActionTypes.createOrderSuccess()),
                    tap(()=>{this._snackBar.open("Order updated", "Dismiss", {duration: 2000})}),
                    catchError((error) => of(orderActionTypes.createOrderFail()))
                )
            }),
        )
    )

}