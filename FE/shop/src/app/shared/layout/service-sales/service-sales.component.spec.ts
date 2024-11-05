import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSalesComponent } from './service-sales.component';

describe('ServiceSalesComponent', () => {
  let component: ServiceSalesComponent;
  let fixture: ComponentFixture<ServiceSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
