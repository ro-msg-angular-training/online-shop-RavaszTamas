import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/models/Product.model';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern("^\\d+$")]),
    image: new FormControl('', [Validators.required, Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')]),
    description: new FormControl('', [Validators.required]),
  })

  productToEdit: Product | undefined;
  alma: string = "1";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
  ) {

    this.onSubmitCallback = this.onSubmitCallback.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  ngOnInit() {

    const productId = Number(this.route.snapshot.paramMap.get('productId'));

    this.productService.getProduct(productId)
      .subscribe(product => {
        this.productToEdit = product, this.setUpForm(product);
      }, error => console.log(error))
  }

  onSubmitCallback(product: Product) {
    if (this.productToEdit !== undefined) {
      product.id = this.productToEdit.id;
      this.productService.updateProduct(product)
        .subscribe(result => {
          window.alert("Entity updated successfully")
          this.router.navigate(['/products'])
        },
          error => {
            window.alert(error)
          }
        )
    }
  }

  setUpForm(product: Product) {
    this.productFormGroup.patchValue({
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image,
      price: product.price
    })
  }
  goBack() {
    this.router.navigate(["/products"])
  }

}
