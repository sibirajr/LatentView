import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CarStock } from './car-stock';
import { CarStockService } from './service/car-stock.service';

import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-car-stock',
  templateUrl: './car-stock.component.html',
  styleUrls: ['./car-stock.component.scss']
})
export class CarStockComponent implements OnInit {

  carStockDetails: Array<CarStock>;
  uniqueBrands: Array<string>;
  uniqueYears: Array<number>;
  uniqueSegments: Array<string>;
  uniqueEngine: Array<string>;

  carStockSubscription: Subscription;
  cartFilterSub$:Observable<Array<CarStock>>

  filteredArray: Array<CarStock>;

  constructor(private carStockService: CarStockService) { }

  carStockForm = new FormGroup({
    brand: new FormControl(''),
    year: new FormControl(''),
    segment: new FormControl(''),
    engine: new FormControl('')
  });

  displayedColumns: string[] = ['brand', 'year', 'segment', 'engine'];

  ngOnInit(): void {
    this.getCarDetailsFetchUniq();
    this.subscribeToFromValChanges();
  }

  getCarDetailsFetchUniq() {
    this.carStockSubscription = this.carStockService.getCarStockDetails().subscribe((carStocks: Array<CarStock>) => {
      console.log(carStocks);
      this.carStockDetails = carStocks;
      this.uniqueBrands = [...new Set(this.carStockDetails.map(carDetaisl => carDetaisl.brand_key))];
      this.uniqueYears = [...new Set(this.carStockDetails.map(carDetaisl => carDetaisl.year))];
      this.uniqueSegments = [...new Set(this.carStockDetails.map(carDetaisl => carDetaisl.segment_key))];
      this.uniqueEngine = [...new Set(this.carStockDetails.map(carDetaisl => carDetaisl.engine_type_key))];
    }
    )
  }

  subscribeToFromValChanges() {
    this.cartFilterSub$ = this.carStockForm.valueChanges.pipe(
      map(carStockFormData => {
        return {
          formValues: carStockFormData,
          filteredCarObj: carStockFormData?.brand ? this.carStockDetails.filter(carStock => carStockFormData?.brand?.includes(carStock.brand_key)) : this.carStockDetails
        }
      }),
      map(({ formValues, filteredCarObj }) => {
        return {
          formValues: formValues,
          filteredCarObj: formValues?.year ? filteredCarObj.filter(carStock => formValues?.year?.includes(carStock.year)) : filteredCarObj
        }
      }),
      map(({ formValues, filteredCarObj }) => {
        return {
          formValues: formValues,
          filteredCarObj: formValues?.segment ? filteredCarObj.filter(carStock => formValues?.segment?.includes(carStock.segment_key)) : filteredCarObj
        }
      }),
      map(({ formValues, filteredCarObj }) =>
        formValues?.engine ? filteredCarObj.filter(carStock => formValues?.engine?.includes(carStock.engine_type_key)) : filteredCarObj
      ),
      tap((filteredData) => console.log(filteredData))
    )
  }

  resetForm() {
    this.carStockForm.reset();
  }

  ngOnDestroy() {
    this.carStockSubscription.unsubscribe();
  }

}
