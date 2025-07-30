import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperMfeComponent } from './wrapper-mfe.component';

describe('WrapperMfeComponent', () => {
  let component: WrapperMfeComponent;
  let fixture: ComponentFixture<WrapperMfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapperMfeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperMfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
