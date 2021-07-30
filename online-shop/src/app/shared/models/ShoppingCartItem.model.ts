import { Product } from "./Product.model";

export interface ShoppingCartItem {
    product: Product,
    quantity:number
}