import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartItem } from 'src/app/shared/models/ShoppingCartItem.model';
import { createOrder, decrementItemQuantity, incrementItemQuantity, removeCartItem } from 'src/app/store/actions/order.actions';
import { getAllShoppingCartItems, getNumberOfItems, isOrderLoading } from 'src/app/store/selectors/order.selectors';
import { isLoading } from 'src/app/store/selectors/product.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {

  displayedColumns: string[] = ['category', 'name', 'price', 'quantity', 'actions'];


  cartItems$: Observable<ShoppingCartItem[]> = this.store.pipe(select(getAllShoppingCartItems));
  numberOfItems$ = this.store.pipe(select(getNumberOfItems))
  canDispatch: boolean = false;

  loading$: Observable<boolean> = this.store.pipe(select(isOrderLoading));

  constructor(
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.numberOfItems$.subscribe((totalCount) => {
      if (totalCount > 0)
        this.canDispatch = true;
    })
  }

  ngOnDestroy() {
  }
  removeFromCart(productId: number) {
    this.store.dispatch(removeCartItem({ productId }))
  }

  performCheckout() {
    if (this.canDispatch)
      this.store.dispatch(createOrder())
    else
      this._snackBar.open("Please add at least one item","Dismiss", {duration:2000})
  }

  incrementCount(productId: number) {
    this.store.dispatch(incrementItemQuantity({ productId }))
  }

  decrementCount(productId: number) {
    this.store.dispatch(decrementItemQuantity({ productId }))
  }
}

