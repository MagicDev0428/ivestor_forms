import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Investor } from '../model/investor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { configService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  apiURL = 'api/investors';  // URL to web api
 
   investor: Investor = {
    id: 1,
    investorName: "Satendra",
    lastName: "rawat",
    address: ""
  }
  constructor(private http: HttpClient, private _configService: configService) { }

  getInvestors() : Observable<Investor[]> {
    return this.http.get<Investor[]>(this.apiURL)
    .pipe(
      map((investor) => investor),
      //tap(investors => this.log(`fetched heroes`)),
      catchError(this._configService.handleError)
    );
  }
  getInvestor(id: number | string): Observable<Investor> {
    return this.getInvestors().pipe(
      map((investors: Investor[]) => investors.find(investor=> investor.id == id))
    )
   
  }

  getMockdata() {
    return of(this.investor);
  }
}
