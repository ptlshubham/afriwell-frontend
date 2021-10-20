import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderSevenComponent } from './header-seven.component';

describe('HeaderSevenComponent', () => {
  let component: HeaderSevenComponent;
  let fixture: ComponentFixture<HeaderSevenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
