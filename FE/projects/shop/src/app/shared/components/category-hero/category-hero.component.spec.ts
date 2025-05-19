import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHeroComponent } from './category-hero.component';

describe('CategoryHeroComponent', () => {
  let component: CategoryHeroComponent;
  let fixture: ComponentFixture<CategoryHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
