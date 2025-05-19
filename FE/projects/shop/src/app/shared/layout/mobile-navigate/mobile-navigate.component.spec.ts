import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavigateComponent } from './mobile-navigate.component';

describe('MobileNavigateComponent', () => {
  let component: MobileNavigateComponent;
  let fixture: ComponentFixture<MobileNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavigateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
