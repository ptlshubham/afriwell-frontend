import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCaurouselBestComponent } from './product-caurousel-best.component';

describe('ProductCaurouselBestComponent', () => {
  let component: ProductCaurouselBestComponent;
  let fixture: ComponentFixture<ProductCaurouselBestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCaurouselBestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCaurouselBestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
