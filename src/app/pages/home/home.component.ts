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
        this.getSpaceXPrograms(params);
      }else{
        console.log(params);
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

  removeFilter(filter: any){
    const delFilVal = this.spaceXservice.deleteFilter(filter);
    this.router.navigate(['/home'], { queryParams:  delFilVal });
  }

}
