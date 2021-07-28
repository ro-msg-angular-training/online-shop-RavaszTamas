import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreatorComponent } from './products/product-creator/product-creator.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditorComponent } from './products/product-editor/product-editor.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ShoppingCartListComponent } from './products/shopping-cart-list/shopping-cart-list.component';

const routes: Routes = [
  { path: 'products/edit/:productId', component: ProductEditorComponent },
  { path: 'products/add', component: ProductCreatorComponent },
  { path: 'products/:productId', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'checkout', component: ShoppingCartListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
