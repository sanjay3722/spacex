import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SpacexService } from './../../../shared/services/spacex.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  filters= {
    limit: 100,
    launch_year: '',
    launch_success: '',
    land_success: ''
  };
  constructor(
    private spacexService: SpacexService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 
     
  }

  ngOnInit() {
     
  }

  addFilter(filterLabel: string, filterVal: any){

      if (filterLabel === 'launchYear'){
        this.filters.launch_year = filterVal;
      }
      if (filterLabel === 'launchSuccess'){
        this.filters.launch_success = filterVal;
      }
      if (filterLabel === 'landSuccess'){
        this.filters.land_success = filterVal;
      }
      this.router.navigate(['/home'], { queryParams:  this.filters });
  }

}
