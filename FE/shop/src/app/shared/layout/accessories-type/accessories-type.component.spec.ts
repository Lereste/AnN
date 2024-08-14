import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesTypeComponent } from './accessories-type.component';

describe('AccessoriesTypeComponent', () => {
  let component: AccessoriesTypeComponent;
  let fixture: ComponentFixture<AccessoriesTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessoriesTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoriesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
