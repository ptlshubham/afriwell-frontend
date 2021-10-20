import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderFiveComponent } from './header-five.component';

describe('HeaderFiveComponent', () => {
  let component: HeaderFiveComponent;
  let fixture: ComponentFixture<HeaderFiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
