import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductTwoComponent } from './product-two.component';

describe('ProductTwoComponent', () => {
  let component: ProductTwoComponent;
  let fixture: ComponentFixture<ProductTwoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
