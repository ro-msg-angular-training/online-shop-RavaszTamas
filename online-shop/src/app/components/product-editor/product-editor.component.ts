import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateNum } from '@ngrx/entity/src/models';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/app/shared/models/Product.model';
import { getProduct, updateProduct } from 'src/app/store/actions/product.actions';
import { getSelectedProduct } from 'src/app/store/selectors/product.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  productFormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required, Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')]),
    description: new FormControl('', [Validators.required]),
  })

  productToEdit$ = this.store.pipe(select(getSelectedProduct));
  selectedProduct?: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.onSubmitCallback = this.onSubmitCallback.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  ngOnInit() {

    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.store.dispatch(getProduct({ productId }))
    this.productToEdit$.subscribe((item) => {
      if (!item) return;
      this.productFormGroup.patchValue(item);
    });
  }

  onSubmitCallback(product: Product) {
    const update: UpdateNum<Product> = {
      id: product.id,
      changes: {
        ...this.productFormGroup.value,
        id: product.id
      }
    }
    console.log(update)
    this.store.dispatch(updateProduct({ update }))
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
