import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerAuthGuard } from './guards/seller-auth.guard';
import { preventAuthAccessGuard } from './guards/prevent-auth-access.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent, canActivate: [preventAuthAccessGuard] },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [sellerAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
