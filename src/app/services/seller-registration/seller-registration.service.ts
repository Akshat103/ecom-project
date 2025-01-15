import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SellerRegistrationData } from '../../model/seller-registration.model';

@Injectable({
    providedIn: 'root'
})
export class SellerRegistrationService {
    private formData = new BehaviorSubject<SellerRegistrationData | null>(null);
    
    constructor() {}

    public getFormData(): Observable<SellerRegistrationData | null> {
        return this.formData.asObservable();
    }

    public async submitForm(data: SellerRegistrationData): Promise<boolean> {
        try {
            console.log(data)

            return true;
        } catch (error) {
            console.error('Error submitting form:', error);
            return false;
        }
    }
}
