import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCategorySectionComponent } from './seller-category-section.component';

describe('SellerCategorySectionComponent', () => {
  let component: SellerCategorySectionComponent;
  let fixture: ComponentFixture<SellerCategorySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerCategorySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerCategorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
