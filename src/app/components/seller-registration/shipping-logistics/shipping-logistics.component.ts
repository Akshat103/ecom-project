import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-logistics',
  templateUrl: './shipping-logistics.component.html',
  styleUrl: './shipping-logistics.component.scss'
})
export class ShippingLogisticsComponent {
  @Input() shippingLogisticsFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  get warehouses(): FormArray {
    return this.shippingLogisticsFormGroup.get('warehouses') as FormArray;
  }

  get shippingPartners(): FormArray {
    return this.shippingLogisticsFormGroup.get('shippingPartners') as FormArray;
  }

  addWarehouse() {
    const warehouse = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
    return this.warehouses.push(warehouse);
  }

  deleteWarehouse(warehouseIndex: number) {
    this.warehouses.removeAt(warehouseIndex);
  }

  addShippingPartner() {
    const shippingPartner = this.fb.group({
      name: ['', Validators.required],
      region: ['', Validators.required]
    });
    this.shippingPartners.push(shippingPartner);
  }

  deleteShippingPartner(shippingPartnerIndex: number) {
    this.shippingPartners.removeAt(shippingPartnerIndex);
  }

}
