import { TestBed } from '@angular/core/testing';

import { SellerRegistrationService } from './seller-registration.service';

describe('SellerRegistrationService', () => {
  let service: SellerRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
