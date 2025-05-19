import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTypeComponent } from './products-type.component';

describe('ProductsTypeComponent', () => {
  let component: ProductsTypeComponent;
  let fixture: ComponentFixture<ProductsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
