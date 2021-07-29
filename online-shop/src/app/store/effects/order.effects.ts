import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { ShoppingCartService } from "src/app/products/shared/CartService/ShoppingCartService.service";
import { OrderRequest } from "src/app/products/shared/models/OrderRequest.model";
import { orderActionTypes } from "../actions/order.actions";
import { selectUser } from "../selectors/auth.selectors";
import { getAllShoppingCartItems } from "../selectors/order.selectors";
import { AppState } from "../state/app.state";


@Injectable()
export class OrderEffects {

    constructor(private shoppingCartService: ShoppingCartService, private actions$: Actions, private store: Store<AppState>) { }

    createOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActionTypes.createOrder),
            withLatestFrom(
                this.store.select(selectUser),
                this.store.select(getAllShoppingCartItems)
            ),
            switchMap(([action, user, cartItems]) => {
                const request:OrderRequest = {
                    customer:user?.username,
                    products:cartItems.map(item=>{return{productId:item.product.id,quantity:item.quantity}})
                };
                return this.shoppingCartService.sendOrderRequest(request).pipe(
                    map((message) => orderActionTypes.createOrderSuccess()),
                    catchError((error) => of(orderActionTypes.createOrderFail()))        
                )
            }),
        )
    )

}