import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductDetailsFoodComponent } from './product-details-food.component';

describe('ProductDetailsFoodComponent', () => {
  let component: ProductDetailsFoodComponent;
  let fixture: ComponentFixture<ProductDetailsFoodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
