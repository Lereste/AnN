import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAccessoriesComponent } from './all-accessories.component';

describe('AllAccessoriesComponent', () => {
  let component: AllAccessoriesComponent;
  let fixture: ComponentFixture<AllAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAccessoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
