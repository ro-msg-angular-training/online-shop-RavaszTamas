import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';
import { addCartItem } from 'src/app/store/actions/order.actions';
import { deleteProduct, getProduct } from 'src/app/store/actions/product.actions';
import { selectIsAdmin, selectIsAdminOrCustomer } from 'src/app/store/selectors/auth.selectors';
import { cartContainsItem } from 'src/app/store/selectors/order.selectors';
import { getSelectedProduct, isLoading } from 'src/app/store/selectors/product.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {


  loading$ = this.store.pipe(select(isLoading));

  selectedProduct$ = this.store.pipe(select(getSelectedProduct));
  selectedItemInCart$ = of(true);
  selectedProductObject?: Product;

  isCustomerOrAdmin$ = this.store.pipe(select(selectIsAdminOrCustomer));
  isAdmin$ = this.store.pipe(select(selectIsAdmin));

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.store.dispatch(getProduct({ productId }));
    this.selectedProduct$.subscribe((item) => (this.selectedProductObject = item));
    this.selectedItemInCart$ = this.store.pipe(select(cartContainsItem(productId)));
  }

  addItemToCart(): void {
    if (this.selectedProductObject !== undefined)
      this.store.dispatch(addCartItem({ productId: this.selectedProductObject.id }));
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '250px',
      data: { productName: this.selectedProductObject?.name }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteItem();
      }
    });
  }

  deleteItem(): void {
    if (this.selectedProductObject !== undefined) {
      this.store.dispatch(deleteProduct({ productId: this.selectedProductObject.id }));
    }
  }
}
