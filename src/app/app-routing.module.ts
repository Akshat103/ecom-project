import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerAuthGuard } from './guards/seller-auth.guard';
import { ProductSearchComponent } from './product-search/product-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [sellerAuthGuard] },
  // { path: 'seller-registration', component: SellerRegistrationFormComponent, canActivate: [sellerAuthGuard] }
  { 
    path: 'seller-registration', 
    loadChildren: () => import('./seller-registration-form/seller-registration-form.module')
      .then(m => m.SellerRegistrationFormModule),
    canActivate: [sellerAuthGuard]
  },
  {
    path:'product-search',
    component:ProductSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
