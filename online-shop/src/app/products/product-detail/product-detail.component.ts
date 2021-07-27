import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../shared/models/Product.model';
import { ProductsService } from '../shared/products.service';
import { ShoppingCartService } from '../shared/CartService/ShoppingCartService.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));

    this.productService.getProduct(productId)
      .subscribe(product => this.product = product, error => console.log(error))
  }

  addItemToCart(): void {
    if (this.product !== undefined)
      this.cartService.addToCart(this.product);
  }

  checkIfItemInCart(): Boolean {
    if (this.product !== undefined)
      return this.cartService.checkIfInCartById(this.product.id)
    return false;
  }

  deleteItem() {
    if (this.product !== undefined) {
      if (this.checkIfItemInCart())
        this.cartService.removeItemFromCart(this.product.id);
        this.productService.deleteProduct(this.product.id).subscribe(
          result => {
            this.router.navigate(['/products'])
            window.alert("Item deleted from database")
          },
          error => window.alert("Failed to delete item")
        );
    }
  }

}
