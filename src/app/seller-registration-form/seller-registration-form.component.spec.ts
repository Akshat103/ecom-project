import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRegistrationFormComponent } from './seller-registration-form.component';

describe('SellerRegistrationFormComponent', () => {
  let component: SellerRegistrationFormComponent;
  let fixture: ComponentFixture<SellerRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
