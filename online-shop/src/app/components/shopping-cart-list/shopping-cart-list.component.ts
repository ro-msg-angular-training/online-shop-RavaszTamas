import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';
import { ShoppingCartItem } from 'src/app/shared/models/ShoppingCartItem.model';
import { createOrder, decrementItemQuantity, incrementItemQuantity, removeCartItem } from 'src/app/store/actions/order.actions';
import { getAllProductsInCart, getAllShoppingCartItemsWithProducts, getNumberOfItems, isOrderLoading } from 'src/app/store/selectors/order.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {

  displayedColumns: string[] = ['category', 'name', 'price', 'quantity', 'actions'];


  cartItems$: Observable<ShoppingCartItem[]> = this.store.pipe(select(getAllShoppingCartItemsWithProducts));
  numberOfItems$ = this.store.pipe(select(getNumberOfItems));
  canDispatch = false;

  loading$: Observable<boolean> = this.store.pipe(select(isOrderLoading));

  constructor(
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.numberOfItems$.subscribe((totalCount) => {
      if (totalCount > 0)
        this.canDispatch = true;
    })
  }

  removeFromCart(productId: number): void {
    this.store.dispatch(removeCartItem({ productId }));
  }

  performCheckout(): void {
    if (this.canDispatch)
      this.store.dispatch(createOrder());
    else
      this._snackBar.open("Please add at least one item", "Dismiss", { duration: 2000 });
  }

  incrementCount(productId: number): void {
    this.store.dispatch(incrementItemQuantity({ productId }));
  }

  decrementCount(productId: number): void {
    this.store.dispatch(decrementItemQuantity({ productId }));
  }
}

