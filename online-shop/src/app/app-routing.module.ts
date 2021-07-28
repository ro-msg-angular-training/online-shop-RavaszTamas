import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './auth/guards/admin/admin-auth.guard';
import { CustomerAuthGuard } from './auth/guards/customer/customer-auth.guard';
import { UserAuthGuard } from './auth/guards/user/user-auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProductCreatorComponent } from './products/product-creator/product-creator.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditorComponent } from './products/product-editor/product-editor.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ShoppingCartListComponent } from './products/shopping-cart-list/shopping-cart-list.component';

const routes: Routes = [
  { path: 'products/edit/:productId', component: ProductEditorComponent, canActivate:[AdminAuthGuard] },
  { path: 'products/add', component: ProductCreatorComponent, canActivate:[AdminAuthGuard] },
  { path: 'products/:productId', component: ProductDetailComponent, canActivate:[UserAuthGuard] },
  { path: 'products', component: ProductListComponent, canActivate:[UserAuthGuard] },
  { path: 'checkout', component: ShoppingCartListComponent, canActivate:[CustomerAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
