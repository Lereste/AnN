import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderSummaryComponent } from './cart-order-summary.component';

describe('CartOrderSummaryComponent', () => {
  let component: CartOrderSummaryComponent;
  let fixture: ComponentFixture<CartOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartOrderSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
