import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';
import { switchMap } from 'rxjs/operators'
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
    private service: ProductsService,
    private cartService: ShoppingCartService
  ) { }

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));

    this.service.getProduct(productId)
      .subscribe(product => this.product = product, error => console.log(error))
  }

  addItemToCart():void{
    if(this.product !== undefined)
      this.cartService.addToCart(this.product);
  }

  checkIfItemInCart():Boolean{
    if(this.product !== undefined)
      return this.cartService.checkIfInCartById(this.product.id)
    return false;
  }

  deleteItem(){

  }

}
