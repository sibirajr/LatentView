import { TestBed } from '@angular/core/testing';

import { CarStockService } from './car-stock.service';

describe('CarStockService', () => {
  let service: CarStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
