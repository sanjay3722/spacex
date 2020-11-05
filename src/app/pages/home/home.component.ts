import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SpacexService } from './../../shared/services/spacex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  spaceXprogramsData: any;
  filters: any;

  constructor(
    private spaceXservice: SpacexService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      
      if(Object.keys(params).length != 0){
        this.filters = params;
        this.getSpaceXPrograms(this.filters);
      }else{
        this.filters = {
          limit: 100,
          launch_year: '',
          launch_success: '',
          land_success: ''
        };
        this.getSpaceXPrograms(this.filters);
      }

    });
  }

  getSpaceXPrograms(paramObj: any){
    const param = 'limit=' + paramObj.limit +
                  '&launch_year=' + paramObj.launch_year +
                  '&launch_success=' + paramObj.launch_success +
                  '&land_success=' + paramObj.land_success;

    this.spaceXservice.fetchSpaceXPrograms(param).subscribe( resData => {
      this.spaceXprogramsData =  resData;
    }, error => {
      console.log('Something went wrong ' + error.message);
    });
  }

  // Remove Filters
  removeFilter(rmFilter: string){
    if (rmFilter === 'clear'){
      this.filters = { limit: 100, launch_year: '', launch_success: '', land_success: ''};
    }
    if (rmFilter === 'launchYear'){
      this.filters = { limit: 100, launch_year: '', launch_success: this.filters.launch_success, land_success: this.filters.land_success };
    }
    if (rmFilter === 'launchSuccess'){
      this.filters = { limit: 100, launch_year: this.filters.launch_year, launch_success: '', land_success: this.filters.land_success };
    }
    if (rmFilter === 'landSuccess'){
      this.filters = { limit: 100, launch_year: this.filters.launch_year, launch_success: this.filters.launch_success, land_success: '' };
       
    }
    this.router.navigate(['/home'], { queryParams:  this.filters });
  }

}
