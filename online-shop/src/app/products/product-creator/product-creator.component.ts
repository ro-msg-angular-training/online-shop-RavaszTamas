import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../shared/models/Product.model';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.scss']
})
export class ProductCreatorComponent implements OnInit {

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern("^\\d+$")]),
    image: new FormControl('', [Validators.required, Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')]),
    description: new FormControl('', [Validators.required]),
  })


  constructor(
    private router: Router,
    private productService:ProductsService
  ) { 
    this.onSubmitCallback = this.onSubmitCallback.bind(this);
    this.goBack = this.goBack.bind(this);

  }

  ngOnInit() {
  }

  onSubmitCallback(product:Product){
    this.productService.createProduct(product).subscribe(result=>{
      window.alert("Product created");
      this.router.navigate(["/products"])
    },
    error=>{
      window.alert("failed to create product");
    }
    )
  }

  goBack(){
    this.router.navigate(["/products"])
  }
}
