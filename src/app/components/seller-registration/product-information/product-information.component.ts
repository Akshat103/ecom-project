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

  get selectedSecondaryCategories(): string[] {
    return this.productInfoFormGroup.get('secondaryCategories')?.value || [];
  }

  addSecondaryCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value && !this.selectedSecondaryCategories.includes(value)) {
      this.productInfoFormGroup.get('secondaryCategories')?.setValue([
        ...this.selectedSecondaryCategories,
        value
      ]);
      this.productInfoFormGroup.get('secondaryCategories')?.updateValueAndValidity();
    }
  }

  removeSecondaryCategory(category: string) {
    const updateCategories = this.selectedSecondaryCategories.filter(item => item !== category);
    this.productInfoFormGroup.get('secondaryCategories')?.setValue(updateCategories);
    this.productInfoFormGroup.get('secondaryCategories')?.updateValueAndValidity();
  }
}
