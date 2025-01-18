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
import { ValidImagePipe } from './pipes/valid-image.pipe';
import { BannerComponent } from './components/home/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryComponent } from './components/home/category/category.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { CommonModule } from '@angular/common';

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
    ValidImagePipe,
    BannerComponent,
    FooterComponent,
    CategoryComponent,
    ProductSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
