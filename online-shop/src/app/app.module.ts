import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCreatorComponent } from './components/product-creator/product-creator.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { ShoppingCartListComponent } from './components/shopping-cart-list/shopping-cart-list.component';
import { AuthEffects } from './store/effects/auth.effects';
import { OrderEffects } from './store/effects/order.effects';
import { ProductEffects } from './store/effects/product.effects';
import { appReducer } from './store/reducers/app.reducers';
import { ProductsResolver } from './store/resolvers/products.resolver';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsService } from './services/product-service/products.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth/services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // do not forget to put brackets here otherwise it will die
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([ProductEffects, AuthEffects, OrderEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,

  ],
  providers: [ProductsService, AuthService, ProductsResolver,{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
