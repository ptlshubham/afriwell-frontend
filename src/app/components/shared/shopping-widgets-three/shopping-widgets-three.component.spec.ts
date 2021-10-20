import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShoppingWidgetsThreeComponent } from './shopping-widgets-three.component';

describe('ShoppingWidgetsThreeComponent', () => {
  let component: ShoppingWidgetsThreeComponent;
  let fixture: ComponentFixture<ShoppingWidgetsThreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingWidgetsThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingWidgetsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
