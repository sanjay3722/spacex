import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpacexService } from './../../../shared/services/spacex.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

  constructor(
    private router: Router,
    private spacexService: SpacexService
  ) { }

  ngOnInit() {
  }

  addFilter(filter: any){
    const filterVal = this.spacexService.filter(filter);
    this.router.navigate(['/home'], { queryParams:  filterVal });
  }

}
