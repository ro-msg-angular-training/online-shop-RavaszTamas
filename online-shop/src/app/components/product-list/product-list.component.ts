import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';
import { selectIsAdmin, selectIsAdminOrCustomer } from 'src/app/store/selectors/auth.selectors';
import { getAllProducts, isLoading } from 'src/app/store/selectors/product.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['category', 'name', 'price', 'actions'];

  products$: Observable<Product[]> = this.store.pipe(select(getAllProducts));

  loading$: Observable<boolean> = this.store.pipe(select(isLoading));

  isAdmin$ = this.store.pipe(select(selectIsAdmin))

  isAdminOrCustomer$ = this.store.pipe(select(selectIsAdminOrCustomer))

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() { }

}
