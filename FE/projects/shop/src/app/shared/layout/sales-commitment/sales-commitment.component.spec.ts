import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCommitmentComponent } from './sales-commitment.component';

describe('SalesCommitmentComponent', () => {
  let component: SalesCommitmentComponent;
  let fixture: ComponentFixture<SalesCommitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCommitmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
