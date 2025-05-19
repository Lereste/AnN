import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickContactsComponent } from './quick-contacts.component';

describe('QuickContactsComponent', () => {
  let component: QuickContactsComponent;
  let fixture: ComponentFixture<QuickContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
