import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { loadProducts, productsLoaded } from "../actions/product.actions";
import { areProductsLoaded } from "../selectors/product.selectors";
import { AppState } from "../state/app.state";

@Injectable()
export class ProductsResolver implements Resolve<Observable<any>>{

    constructor(private store: Store<AppState>){}

    resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.store.pipe(
            select(areProductsLoaded),
            tap((productsLoaded)=>{
                if(!productsLoaded)
                    this.store.dispatch(loadProducts());
            }),
            filter(productsLoaded => productsLoaded),
            first()
        )
    }
    
}