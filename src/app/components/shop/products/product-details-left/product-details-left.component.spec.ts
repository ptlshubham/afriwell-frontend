import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductDetailsLeftComponent } from './product-details-left.component';

describe('ProductDetailsLeftComponent', () => {
  let component: ProductDetailsLeftComponent;
  let fixture: ComponentFixture<ProductDetailsLeftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
