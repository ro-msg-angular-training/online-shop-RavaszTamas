import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ShoppingCartListComponent } from './products/shopping-cart-list/shopping-cart-list.component';

const routes: Routes = [
  { path: 'products/:productId', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'checkout', component: ShoppingCartListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
