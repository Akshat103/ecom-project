import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerRegistrationFormComponent } from './seller-registration-form.component';
import { BusinessDetailsComponent } from '../components/seller-registration/business-details/business-details.component';
import { BankDetailsComponent } from '../components/seller-registration/bank-details/bank-details.component';
import { UploadsComponent } from '../components/seller-registration/uploads/uploads.component';
import { ProductInformationComponent } from '../components/seller-registration/product-information/product-information.component';
import { ShippingLogisticsComponent } from '../components/seller-registration/shipping-logistics/shipping-logistics.component';
import { AdditionalFieldsComponent } from '../components/seller-registration/additional-fields/additional-fields.component';
import { BasicInfoComponent } from '../components/seller-registration/basic-info/basic-info.component';

const routes: Routes = [
  {
    path: '',
    component: SellerRegistrationFormComponent
  }
];

@NgModule({
  declarations: [
    SellerRegistrationFormComponent,
    BusinessDetailsComponent,
    BankDetailsComponent,
    UploadsComponent,
    ProductInformationComponent,
    ShippingLogisticsComponent,
    AdditionalFieldsComponent,
    BasicInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SellerRegistrationFormModule { }