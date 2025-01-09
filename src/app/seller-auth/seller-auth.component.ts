import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss'
})
export class SellerAuthComponent {
  signupForm: FormGroup;
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  sellerService = inject(SellerService);
  onSubmit() {
    if (this.signupForm.valid) {
      this.sellerService.sellerSignUp(this.signupForm.value).subscribe({
        next: (res) => {
          if (res) {
            this.signupForm.reset();
            localStorage.setItem('mySignal', 'true');
            this.router.navigate(['seller-home']);
          }
        },
        error: (error) => {
          console.error('Signup failed:', error);
        }
      });
    }
  }
}
