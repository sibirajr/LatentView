import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { map, switchMap, tap } from 'rxjs/operators';
import { CarStock } from '../car-stock';


@Injectable({
  providedIn: 'root'
})
export class CarStockService {

  carDetailsjsonPath: string = 'assets/query_results.json';

  constructor(private http: HttpClient) { }

  public getCarStockDetails(): Observable<Array<CarStock>> {
    return this.http.get<any>(this.carDetailsjsonPath).pipe(
      map((jsonRes) => jsonRes.body.data)
    )
  }

}
