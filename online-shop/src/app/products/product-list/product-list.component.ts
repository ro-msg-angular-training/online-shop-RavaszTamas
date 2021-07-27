import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(
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

  log(toLog:any){
    console.log(toLog);
  }

}
