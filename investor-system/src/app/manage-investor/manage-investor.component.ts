import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Investor } from '../interface/investor';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-manage-investor',
  templateUrl: './manage-investor.component.html',
  styleUrls: ['./manage-investor.component.scss']
})
export class ManageInvestorComponent implements OnInit {

  selectedInvestor$!: Observable<Investor>;
  constructor(private activatedRoute: ActivatedRoute) {

    this.selectedInvestor$ = activatedRoute.params.pipe(map(p => p['id']));
    this.selectedInvestor$.subscribe(res => {
      console.log(res);
    })
    
  }
  ngOnInit() {
  //   this.activatedRoute.paramMap.subscribe((params: ParamMap) =>  {
  //     this.selectedInvestor$ = params.get('id');
  // });
  }
}
