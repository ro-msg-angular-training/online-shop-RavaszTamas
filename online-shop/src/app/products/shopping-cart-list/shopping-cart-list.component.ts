import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shared/CartService/ShoppingCartService.service';
import { Product } from '../shared/models/Product.model';
import { ShoppingCartItem } from '../shared/models/ShoppingCartItem.model';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {

  products: ShoppingCartItem[] = [];

  constructor(
    private router:Router,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.products = this.shoppingCartService.getIems();
  }

  removeFromCart(productId: number) {
    this.shoppingCartService.removeItemFromCart(productId);
    this.products = this.shoppingCartService.getIems();
  }

  performCheckout() {
    const result = this.shoppingCartService.performCheckoutWithItems();
    if (result === undefined)
      window.alert("No items in the shopping cart!")
    else
      result.subscribe(result => {
        window.alert("Order created successfully");
        this.shoppingCartService.clearCart();
        this.router.navigate(['/products'])
      },
        (error:HttpErrorResponse) => {
          console.log(error);
          window.alert(`Error creating the order ${error.toString()}`)
        }
      )

  }

  incerementCount(productId: number) {
    if (this.shoppingCartService.checkIfInCartById(productId)) {
      this.shoppingCartService.incrementItem(productId);
    }
  }

  decrementCount(productId: number) {
    if (this.shoppingCartService.checkIfInCartById(productId))
      this.shoppingCartService.decrementItem(productId);
  }

}
