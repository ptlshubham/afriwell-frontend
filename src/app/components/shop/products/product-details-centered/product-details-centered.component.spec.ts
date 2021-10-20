import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductDetailsCenteredComponent } from './product-details-centered.component';

describe('ProductDetailsCenteredComponent', () => {
  let component: ProductDetailsCenteredComponent;
  let fixture: ComponentFixture<ProductDetailsCenteredComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsCenteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsCenteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
