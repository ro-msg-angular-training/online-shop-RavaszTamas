import { Injectable } from '@angular/core';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  items: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    if(this.checkIfInCartById(product.id) === false)
    {
      this.items.push(product);
      window.alert('Your product has been added to the cart!');
    }
  }

  getIems(){
    return this.items;
  }

  clearCart(){
    this.items = [];
    return this.items;
  }
  
  checkIfInCartById(productId:Number):Boolean{
    return this.items.some(item => item.id == productId);
  }


  removeItemFromCart(productId:Number):Boolean{
    if(this.checkIfInCartById(productId)){
      this.items = this.items.filter(item => item.id != productId );
      return true;
    }
    return false;
  }

}
