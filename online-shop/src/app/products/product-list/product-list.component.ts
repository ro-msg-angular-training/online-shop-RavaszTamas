import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../shared/models/Product.model';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private authService: AuthService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getProducts();
  }
  private getProducts() {
    this.productsService.getProducts().subscribe(
      products => {
        this.products = products
        console.log('resulting products',products);
      },
      error => {
        console.log('Http error', error);
      }
    )
    
  }

  isAdminUser(){
      return this.authService.isLoggedIn && this.authService.hasRole("admin");
  }

  isAdminOrCustomer(){
    return this.authService.isLoggedIn && (this.authService.hasRole("admin") || this.authService.hasRole("customer"));
}

}
