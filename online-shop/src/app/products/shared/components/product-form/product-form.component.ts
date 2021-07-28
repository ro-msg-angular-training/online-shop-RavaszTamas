import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {


  @Input()
  productFormGroup:FormGroup | undefined;

  @Input()
  submitCallback:((args: Product) => void) | undefined;

  @Input()
  cancelCallback:(() => void) | undefined;

  constructor(
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.submitCallback !== undefined && this.productFormGroup !== undefined)
      this.submitCallback({...this.productFormGroup.value});
  }

  goBack() {
    if(this.cancelCallback !== undefined)
      this.cancelCallback();
  }

}
