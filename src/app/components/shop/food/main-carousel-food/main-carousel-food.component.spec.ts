import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainCarouselComponentFood } from './main-carousel-food.component';

describe('MainCarouselComponent', () => {
  let component: MainCarouselComponentFood;
  let fixture: ComponentFixture<MainCarouselComponentFood>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCarouselComponentFood ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCarouselComponentFood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
