import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductZoomComponent } from './product-zoom.component';

describe('ProductZoomComponent', () => {
  let component: ProductZoomComponent;
  let fixture: ComponentFixture<ProductZoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
