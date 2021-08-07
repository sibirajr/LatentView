import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarStockComponent } from './car-stock.component';

describe('CarStockComponent', () => {
  let component: CarStockComponent;
  let fixture: ComponentFixture<CarStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
