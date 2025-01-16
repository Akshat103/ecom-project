import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerRegistrationService } from '../services/seller-registration/seller-registration.service';
import { SellerRegistrationData, } from '../model/seller-registration.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-registration-form',
  templateUrl: './seller-registration-form.component.html',
  styleUrls: ['./seller-registration-form.component.scss']
})
export class SellerRegistrationFormComponent implements OnInit, OnDestroy {
  sellerForm!: FormGroup;
  currentStep = 0;
  private sellerFormSubscription!: Subscription;

  steps = [
    { id: 'basicInfo', label: 'Basic Information' },
    { id: 'businessDetails', label: 'Business Details' },
    { id: 'bankDetails', label: 'Bank Details' },
    { id: 'uploads', label: 'Document Uploads' },
    { id: 'productInfo', label: 'Product Information' },
    { id: 'shippingLogistics', label: 'Shipping & Logistics' }
  ];

  constructor(
    private fb: FormBuilder,
    private sellerRegistrationService: SellerRegistrationService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.sellerFormSubscription = this.sellerRegistrationService.getFormData()
      .subscribe((data: SellerRegistrationData | null) => {
        if (data) {
          this.sellerForm.patchValue(data, { emitEvent: false });
        }
      });
  }

  ngOnDestroy(): void {
    this.sellerFormSubscription?.unsubscribe();
  }

  private initializeForm(): void {
    this.sellerForm = this.fb.group({
      basicInfo: this.fb.group({
        sellerName: ['', [Validators.required, Validators.minLength(3)]],
        businessName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        alternateContact: ['', [Validators.pattern(/^[0-9]{10}$/)]],
        businessWebsite: ['', [Validators.pattern(/https?:\/\/.+/)]]
      }),
      businessDetails: this.fb.group({
        businessType: ['', Validators.required],
        gstNumber: ['', Validators.pattern(/^[A-Za-z0-9]{15}$/)],
        panCard: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{10}$/)]],
        aadharCard: ['', Validators.pattern(/^[0-9]{12}$/)],
        registrationNumber: ['', Validators.required],
        businessAddress: ['', [Validators.required, Validators.minLength(10)]],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      }),
      bankDetails: this.fb.group({
        accountHolderName: ['', [Validators.required, Validators.minLength(3)]],
        bankName: ['', Validators.required],
        accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8,18}$/)]],
        ifscCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{11}$/)]],
        branchAddress: ['', [Validators.required, Validators.minLength(5)]],
        upiId: ['']
      }),
      uploads: this.fb.group({
        businessCert: [null, Validators.required],
        gstCert: [null],
        bankPassbook: [null, Validators.required],
        addressProof: [null, Validators.required],
        ownerIdProof: [null, Validators.required]
      }),
      productInfo: this.fb.group({
        primaryCategory: ['', Validators.required],
        secondaryCategories: [[]],
        salesVolume: ['', Validators.required]
      }),
      shippingLogistics: this.fb.group({
        shippingPartners: this.fb.array([]),
        selfShipping: [false, Validators.required],
        returnAddress: ['', [Validators.required, Validators.minLength(10)]],
        warehouses: this.fb.array([])
      })
    });
  }

  async onSubmit(): Promise<void> {
    if (this.sellerForm.valid) {
      try {
        const success = await this.sellerRegistrationService.submitForm(this.sellerForm.value);
        if (success) console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  }

  getStepFormGroup(stepId: string): FormGroup {
    const group = this.sellerForm.get(stepId);
    if (!group || !(group instanceof FormGroup)) {
      throw new Error(`Invalid form group for step ${stepId}`);
    }
    return group;
  }

  nextHandler(): void {
    if (this.currentStep < this.steps.length - 1) this.currentStep++;
  }

  previousHandler(): void {
    if (this.currentStep > 0) this.currentStep--;
  }

  private isCurrentStepValid(): boolean {
    const currentStepGroup = this.sellerForm.get(this.steps[this.currentStep].id);
    return currentStepGroup ? currentStepGroup.valid : false;
  }
}
