import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ShoppingCartListComponent } from './products/shopping-cart-list/shopping-cart-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductListComponent,
    ShoppingCartListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
