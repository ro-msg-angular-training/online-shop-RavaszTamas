import { Product } from "./Product.model";

export interface ShoppingCartItem {
    productId: number;
    product?:Product
    quantity:number;
}