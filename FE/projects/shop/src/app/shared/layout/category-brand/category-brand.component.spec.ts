import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMainComponent } from './category-brand.component';

describe('CategoryMainComponent', () => {
  let component: CategoryMainComponent;
  let fixture: ComponentFixture<CategoryMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
