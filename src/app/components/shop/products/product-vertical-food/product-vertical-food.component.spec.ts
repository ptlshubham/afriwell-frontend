import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductVerticalFoodComponent } from './product-vertical-food.component';

describe('ProductVerticalFoodComponent', () => {
  let component: ProductVerticalFoodComponent;
  let fixture: ComponentFixture<ProductVerticalFoodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVerticalFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVerticalFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
