import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainCarouselIndustrialComponent } from './main-carousel-industrial.component';

describe('MainCarouselComponent', () => {
  let component: MainCarouselIndustrialComponent;
  let fixture: ComponentFixture<MainCarouselIndustrialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCarouselIndustrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCarouselIndustrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
