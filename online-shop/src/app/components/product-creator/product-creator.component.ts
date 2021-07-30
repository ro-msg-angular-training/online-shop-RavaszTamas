import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';
import { createProduct } from 'src/app/store/actions/product.actions';
import { isLoading } from 'src/app/store/selectors/product.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.scss']
})
export class ProductCreatorComponent implements OnInit {

  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required, Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')]),
    description: new FormControl('', [Validators.required]),
  })

  loading$: Observable<boolean> = this.store.pipe(select(isLoading));

  constructor(
    private router: Router,
    private store:Store<AppState>
  ) { 
    this.onSubmitCallback = this.onSubmitCallback.bind(this);
    this.goBack = this.goBack.bind(this);

  }

  ngOnInit() {
  }

  onSubmitCallback(product:Product){
    this.store.dispatch(createProduct({product}))
  }

  goBack(){
    this.router.navigate(["/products"])
  }
}
