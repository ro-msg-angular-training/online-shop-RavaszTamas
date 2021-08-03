import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../../matchers/MyErrorStateMatcher';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  matcher = new MyErrorStateMatcher();


  @Input()
  productFormGroup: FormGroup | undefined;

  @Input()
  submitCallback: ((args: Product) => void) | undefined;

  @Input()
  cancelCallback: (() => void) | undefined;

  onSubmit(): void {
    if (this.submitCallback !== undefined && this.productFormGroup !== undefined)
      this.submitCallback({ ...this.productFormGroup.value });
  }

  goBack(): void {
    if (this.cancelCallback !== undefined)
      this.cancelCallback();
  }

}
