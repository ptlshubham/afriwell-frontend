import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCaurouselSaleComponent } from './product-caurousel-sale.component';

describe('ProductCaurouselSaleComponent', () => {
  let component: ProductCaurouselSaleComponent;
  let fixture: ComponentFixture<ProductCaurouselSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCaurouselSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCaurouselSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
