import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingLogisticsComponent } from './shipping-logistics.component';

describe('ShippingLogisticsComponent', () => {
  let component: ShippingLogisticsComponent;
  let fixture: ComponentFixture<ShippingLogisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingLogisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
