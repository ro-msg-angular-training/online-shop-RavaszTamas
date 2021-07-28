import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCreatorComponent } from './products/product-creator/product-creator.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditorComponent } from './products/product-editor/product-editor.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/shared/components/product-form/product-form.component';
import { ShoppingCartListComponent } from './products/shopping-cart-list/shopping-cart-list.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductListComponent,
    ShoppingCartListComponent,
    ProductEditorComponent,
    ProductCreatorComponent,
    ProductFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
