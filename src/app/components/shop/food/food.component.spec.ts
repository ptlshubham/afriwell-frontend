import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodComponent } from './food.component';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
