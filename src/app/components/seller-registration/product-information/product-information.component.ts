import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { availableCategories } from '../../../../constants/categoryConstant';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.scss'
})
export class ProductInformationComponent {
  @Input() productInfoFormGroup!: FormGroup;
  availableCategories = availableCategories;
}
