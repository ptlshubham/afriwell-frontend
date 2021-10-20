import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriesFurnitureComponent } from './categories-furniture.component';

describe('CategoriesFurnitureComponent', () => {
  let component: CategoriesFurnitureComponent;
  let fixture: ComponentFixture<CategoriesFurnitureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesFurnitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
