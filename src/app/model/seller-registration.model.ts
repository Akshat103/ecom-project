// Convert classes to interfaces
export interface BasicInfo {
    sellerName: string;
    businessName: string;
    email: string;
    phoneNumber: string;
    alternateContact?: string;
    businessWebsite?: string;
}

export interface BusinessDetails {
    businessType: string;
    gstNumber?: string;
    panCard: string;
    aadharCard?: string;
    registrationNumber: string;
    businessAddress: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
}

export interface BankDetails {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchAddress: string;
    upiId?: string;
}

export interface DocumentUploads {
    businessCert: File;
    gstCert?: File;
    bankPassbook: File;
    addressProof: File;
    ownerIdProof: File;
}

export interface ProductInformation {
    primaryCategory: string;
    secondaryCategories?: string[];
    salesVolume: number;
}

export interface ShippingLogistics {
    shippingPartners?: { name: string; region: string; }[];
    selfShipping: boolean;
    returnAddress?: string;
    warehouses: { name: string; location: string; }[];
}

export interface SellerRegistrationData {
    basicInfo: BasicInfo;
    businessDetails: BusinessDetails;
    bankDetails: BankDetails;
    uploads: DocumentUploads;
    productInfo: ProductInformation;
    shippingLogistics: ShippingLogistics;
}
