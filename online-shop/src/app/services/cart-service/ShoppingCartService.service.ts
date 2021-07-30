import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequest } from 'src/app/shared/models/OrderRequest.model';
import { Product } from 'src/app/shared/models/Product.model';
import { ShoppingCartItem } from 'src/app/shared/models/ShoppingCartItem.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  items: ShoppingCartItem[] = [];
  private ordersUrl: string = 'http://localhost:3000/orders';
  constructor(private httpClient: HttpClient) { }

  addToCart(product: Product) {
    if (this.checkIfInCartById(product.id) === false) {
      this.items.push({ product, quantity: 1 });
      window.alert('Your product has been added to the cart!');
    }
  }

  getItems() {
    return this.items;
  }

  getItemsAsProduct(): Product[] {
    return this.items.map(item => item.product);
  }


  clearCart() {
    this.items.splice(0, this.items.length);
    return this.items;
  }

  checkIfInCartById(productId: Number): Boolean {
    return this.items.some(item => item.product.id == productId);
  }

  getItemById(productId: Number): ShoppingCartItem | undefined {
    return this.items.find(item => item.product.id == productId);
  }

  incrementItem(productId: Number) {
    const index = this.items.findIndex(item => item.product.id == productId);
    if (index >= 0) {
      this.items[index].quantity += 1;
    }
  }

  decrementItem(productId: number) {
    const index = this.items.findIndex(item => item.product.id == productId);
    if (index >= 0 && this.items[index].quantity > 1) {
      this.items[index].quantity -= 1;
    }
  }

  removeItemFromCart(productId: Number): Boolean {
    if (this.checkIfInCartById(productId)) {
      this.items = this.items.filter(item => item.product.id != productId);
      return true;
    }
    return false;
  }

  performCheckoutWithItems(): Observable<any> | undefined {

    if (this.items.length > 0) {
      const orderRequest: OrderRequest =
      {
        customer: "doej",
        products: this.items
          .map(item => { return { productId: item.product.id, quantity: item.quantity } })
      }
      return this.sendOrderRequest(orderRequest);
    }
    return undefined;
  }
  sendOrderRequest(orderRequest: OrderRequest): Observable<any> {
    console.log('sendOrderRequest() enter');
    const url = `${this.ordersUrl}`;
    console.log('sendOrderRequest() path', url);
    const myHttpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: "text" as "json"
    }
    const result = this.httpClient.post<any>(url, orderRequest, myHttpOptions);
    console.log('sendOrderRequest() finished', result);
    return result;
  }


}
