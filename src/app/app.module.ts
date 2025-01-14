import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { RouterLink } from '@angular/router';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { provideHttpClient } from '@angular/common/http';
import { SellerCategorySectionComponent } from './components/seller-category-section/seller-category-section.component';
import { SellerProductListComponent } from './components/seller-product-list/seller-product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SellerRegistrationFormComponent } from './seller-registration-form/seller-registration-form.component';
import { BusinessDetailsComponent } from './components/seller-registration/business-details/business-details.component';
import { BankDetailsComponent } from './components/seller-registration/bank-details/bank-details.component';
import { UploadsComponent } from './components/seller-registration/uploads/uploads.component';
import { ProductInformationComponent } from './components/seller-registration/product-information/product-information.component';
import { ShippingLogisticsComponent } from './components/seller-registration/shipping-logistics/shipping-logistics.component';
import { AdditionalFieldsComponent } from './components/seller-registration/additional-fields/additional-fields.component';
import { BasicInfoComponent } from './components/seller-registration/basic-info/basic-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerCategorySectionComponent,
    SellerProductListComponent,
    ProductFormComponent,
    SellerRegistrationFormComponent,
    BusinessDetailsComponent,
    BankDetailsComponent,
    UploadsComponent,
    ProductInformationComponent,
    ShippingLogisticsComponent,
    AdditionalFieldsComponent,
    BasicInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
