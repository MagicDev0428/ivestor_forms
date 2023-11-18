import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Investor } from '../interface/investor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { configService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  apiURL = 'api/investors';  // URL to web api
 

  constructor(private http: HttpClient, private _configService: configService) { }

  getInvestors() : Observable<Investor[]> {
    return this.http.get<Investor[]>(this.apiURL)
    .pipe(
      map((investor) => investor),
      //tap(investors => this.log(`fetched heroes`)),
      catchError(this._configService.handleError)
    );
  }
  getInvestor(id: number | string) {
    return this.getInvestors().pipe(
      map((investors: Investor[]) => investors.find(investor=> investor.id == id))
    )
  }
}
