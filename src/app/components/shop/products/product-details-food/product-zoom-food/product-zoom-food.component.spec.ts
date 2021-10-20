import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductZoomFoodComponent } from './product-zoom-food.component';

describe('ProductZoomComponent', () => {
  let component: ProductZoomFoodComponent;
  let fixture: ComponentFixture<ProductZoomFoodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductZoomFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductZoomFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
