import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  filtersParams: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  fetchSpaceXPrograms(paramObj: string){
    return this.http.get('https://api.spacexdata.com/v3/launches?' + paramObj);
  }
 
  // Remove Filters
  deleteFilter(rmvFilter: any){
    if (rmvFilter.filter === 'clear'){
      this.filtersParams = {
        limit: 100,
        launch_year: '',
        launch_success: '',
        land_success: ''
      };
    }
    if (rmvFilter.filter === 'year'){
      this.filtersParams = {
        limit: 100,
        launch_year: '',
        launch_success: this.filtersParams.launch_success,
        land_success: this.filtersParams.land_success
      };
    }
    if (rmvFilter.filter === 'launch'){
      this.filtersParams = {
        limit: 100,
        launch_year: this.filtersParams.launch_year,
        launch_success: '',
        land_success: this.filtersParams.land_success
      };
    }
    if (rmvFilter.filter === 'land'){
      this.filtersParams = {
        limit: 100,
        launch_year: this.filtersParams.launch_year,
        launch_success: this.filtersParams.launch_success,
        land_success: ''
      };
    }
    return this.filtersParams;
    // this.router.navigate(['/home'], { queryParams:  this.filtersParams });

  }

}
