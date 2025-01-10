import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller/seller.service';
import { Seller } from '../model/seller.model';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss'
})
export class SellerAuthComponent {
  signupForm: FormGroup;
  signinForm: FormGroup;

  showSignUp = signal(false);
  showIncorrectDetailsError = signal(false);

  toggleShowSignUp() {
    this.showSignUp.update((val) => !val);
  }

  isPasswordVisible = signal(false);
  togglePasswordVisibility() {
    this.isPasswordVisible.update((val) => !val);
  }

  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['admin'],
        avatar: ['https://i.imgur.com/LDOO4Qs.jpg'],
      }
    );
    this.signinForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  sellerService = inject(SellerService);
  loginDataService = inject(DataService);

  onSignUpSubmit() {
    if (this.signupForm.valid) {
      this.sellerService.sellerSignUp(this.signupForm.value).subscribe({
        next: (res) => {
          if (res) {
            this.signupForm.reset();
            this.loginDataService.setLogInData({ loggedIn: true, seller: true });
            this.router.navigate(['seller-home']);
          }
        },
        error: (error) => {
          console.error('Signup failed:', error);
        }
      });
    }
  }

  onSignInSubmit() {
    if (this.signinForm.valid) {
      this.sellerService.sellerSignIn(this.signinForm.value).subscribe({
        next: (res) => {
          const sellers = res as Seller[];
          if (sellers.length) {
            this.signinForm.reset();
            this.loginDataService.setLogInData({ loggedIn: true, seller: true });
            this.router.navigate(['seller-home']);
          } else {
            this.showIncorrectDetailsError.set(true);
          }
        },
        error: (error) => {
          console.error('Signup failed:', error);
        },
        complete() {

        },
      });
    }
  }
}
