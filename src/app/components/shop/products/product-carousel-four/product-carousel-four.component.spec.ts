import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductCarouselFourComponent } from './product-carousel-four.component';

describe('ProductCarouselFourComponent', () => {
  let component: ProductCarouselFourComponent;
  let fixture: ComponentFixture<ProductCarouselFourComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCarouselFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
