import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SellerRegistrationData } from '../../model/seller-registration.model';

@Injectable({
    providedIn: 'root'
})
export class SellerRegistrationService {
    private formData = new BehaviorSubject<SellerRegistrationData | null>(null);
    
    constructor() {}

    public updateFormData(data: Partial<SellerRegistrationData>): void {
        const currentData = this.formData.value;
        this.formData.next({
            ...currentData,
            ...data
        } as SellerRegistrationData);
    }

    public getFormData(): Observable<SellerRegistrationData | null> {
        return this.formData.asObservable();
    }

    public getCurrentStep(data: SellerRegistrationData): number {
        if (!data.isBasicInfoComplete()) return 0;
        if (!data.isBusinessDetailsComplete()) return 1;
        if (!data.isBankDetailsComplete()) return 2;
        if (!data.isUploadsComplete()) return 3;
        if (!data.isProductInfoComplete()) return 4;
        if (!data.isShippingLogisticsComplete()) return 5;
        if (!data.isAdditionalFieldsComplete()) return 6;
        return 0;
    }

    public async submitForm(data: SellerRegistrationData): Promise<boolean> {
        try {
            // Make sure the form data is valid before submitting
            if (!data.isBasicInfoComplete() || !data.isBusinessDetailsComplete() ||
                !data.isBankDetailsComplete() || !data.isUploadsComplete()) {
                throw new Error('Form is incomplete');
            }

            // Simulate form submission
            // const response = await fetch('/api/seller-registration', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data.toJSON()),
            // });

            // if (!response.ok) {
            //     throw new Error('Form submission failed');
            // }

            return true;
        } catch (error) {
            console.error('Error submitting form:', error);
            return false;
        }
    }
}
