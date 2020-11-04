import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  qParams = {
    limit: 100,
    launch_year: '',
    launch_success: '',
    land_success: ''
  };

  filters: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.filters = params;
    });
  }


  fetchSpaceXPrograms(paramObj: string){
    return this.http.get('https://api.spacexdata.com/v3/launches?' + paramObj);
  }

  filter(filter: any){
    if (filter.launch_year){
      this.qParams.launch_year = filter.launch_year;
    }
    else if (filter.launch_success){
      this.qParams.launch_success = filter.launch_success;
    }
    else if (filter.land_success){
      this.qParams.land_success = filter.land_success;
    }
    return this.qParams;

  }

  // Remove Filters
  deleteFilter(rmvFilter: any){
    if (rmvFilter.filter === 'clear'){
      this.filters = {
        limit: 100,
        launch_year: '',
        launch_success: '',
        land_success: ''
      };
    }
    else if (rmvFilter.filter === 'year'){
      this.filters = {
        limit: 100,
        launch_year: '',
        launch_success: this.filters.launch_success,
        land_success: this.filters.land_success
      };
    }
    else if (rmvFilter.filter === 'launch'){
      this.filters = {
        limit: 100,
        launch_year: this.filters.launch_year,
        launch_success: '',
        land_success: this.filters.land_success
      };
    }
    else if (rmvFilter.filter === 'land'){
      this.filters = {
        limit: 100,
        launch_year: this.filters.launch_year,
        launch_success: this.filters.launch_success,
        land_success: ''
      };
    }
    return this.filters;

  }

}
