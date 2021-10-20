import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductRightSidebarComponent } from './product-right-sidebar.component';

describe('ProductRightSidebarComponent', () => {
  let component: ProductRightSidebarComponent;
  let fixture: ComponentFixture<ProductRightSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRightSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
