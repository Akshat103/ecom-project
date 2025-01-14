export class BasicInfo {
    sellerName: string = "";
    businessName: string = "";
    email: string = "";
    phoneNumber: string = "";
    alternateContact?: string;
    businessWebsite?: string;

    public isCompleted(): boolean {
        return !!(
            this.sellerName &&
            this.businessName &&
            this.email &&
            this.phoneNumber
        );
    }
}

export class BusinessDetails {
    businessType: string = "";
    gstNumber?: string;
    panCard: string = "";
    aadharCard?: string;
    registrationNumber: string = "";
    businessAddress: string = "";
    country: string = "";
    state: string = "";
    city: string = "";
    postalCode: string = "";

    public isCompleted(): boolean {
        return !!(
            this.businessType &&
            this.panCard &&
            this.registrationNumber &&
            this.businessAddress &&
            this.country &&
            this.state &&
            this.city &&
            this.postalCode
        );
    }
}

export class BankDetails {
    accountHolderName: string = "";
    bankName: string = "";
    accountNumber: string = "";
    ifscCode: string = "";
    branchAddress: string = "";
    upiId?: string;

    public isCompleted(): boolean {
        return !!(
            this.accountHolderName &&
            this.bankName &&
            this.accountNumber &&
            this.ifscCode &&
            this.branchAddress
        );
    }
}

export class DocumentUploads {
    businessCert: File = new File([], "");
    gstCert?: File;
    bankPassbook: File = new File([], "");
    addressProof: File = new File([], "");
    ownerIdProof: File = new File([], "");

    public isCompleted(): boolean {
        return !!(
            this.businessCert &&
            this.bankPassbook &&
            this.addressProof &&
            this.ownerIdProof
        );
    }
}

export class ProductInformation {
    primaryCategory: string = "";
    secondaryCategories?: string[];
    salesVolume: number = 0;

    public isCompleted(): boolean {
        return !!(
            this.primaryCategory &&
            this.salesVolume
        );
    }
}

export class ShippingLogistics {
    shippingPartners?: string[];
    selfShipping: boolean = false;
    returnAddress?: string;
    warehouses: string[] = [];

    public isCompleted(): boolean {
        return !!(
            this.selfShipping !== undefined &&
            this.warehouses.length > 0
        );
    }
}

export class CustomField {
    fieldName: string = "";
    fieldType: string = "";
    isRequired: boolean = false;
    value?: any;

    public isCompleted(): boolean {
        return this.isRequired ? !!this.value : true;
    }
}

export class SellerRegistrationData {
    basicInfo: BasicInfo = new BasicInfo();
    businessDetails: BusinessDetails = new BusinessDetails();
    bankDetails: BankDetails = new BankDetails();
    uploads: DocumentUploads = new DocumentUploads();
    productInfo: ProductInformation = new ProductInformation();
    shippingLogistics: ShippingLogistics = new ShippingLogistics();
    additionalFields: CustomField[] = [];

    constructor(data?: Partial<SellerRegistrationData>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    public isBasicInfoComplete(): boolean {
        return this.basicInfo.isCompleted();
    }

    public isBusinessDetailsComplete(): boolean {
        return this.businessDetails.isCompleted();
    }

    public isBankDetailsComplete(): boolean {
        return this.bankDetails.isCompleted();
    }

    public isUploadsComplete(): boolean {
        return this.uploads.isCompleted();
    }

    public isProductInfoComplete(): boolean {
        return this.productInfo.isCompleted();
    }

    public isShippingLogisticsComplete(): boolean {
        return this.shippingLogistics.isCompleted();
    }

    public isAdditionalFieldsComplete(): boolean {
        return this.additionalFields.every(field => field.isCompleted());
    }

    public toJSON(): object {
        return {
            basicInfo: this.basicInfo,
            businessDetails: this.businessDetails,
            bankDetails: this.bankDetails,
            uploads: {
                businessCert: this.uploads.businessCert?.name,
                gstCert: this.uploads.gstCert?.name,
                bankPassbook: this.uploads.bankPassbook?.name,
                addressProof: this.uploads.addressProof?.name,
                ownerIdProof: this.uploads.ownerIdProof?.name
            },
            productInfo: this.productInfo,
            shippingLogistics: this.shippingLogistics,
            additionalFields: this.additionalFields
        };
    }
}
