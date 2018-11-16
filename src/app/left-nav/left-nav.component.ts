import { Component, OnInit } from '@angular/core';
import { LeftnavService } from './../../../src/searchfilterservices/leftnav.service';
import { SearchFiltersService } from '../../searchfilterservices/searchfilters.service';

import { ISearchFilters } from '../searchfilters/ISearchFilters';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  
  savedfilters: ISearchFilters[];
  public isToggle = false;
  
 
  constructor(private _searchFilterService: SearchFiltersService, private leftnavservice: LeftnavService) { }

  ngOnInit() {
        this._searchFilterService.GetSavedFiltersList().subscribe(
          res=>{ 
            this.savedfilters = res;
            this.leftnavservice.addLatestTemplateName(res)
          });
        this.leftnavservice.getTemplateNames().subscribe(res => {
          console.log(res)
          this.savedfilters = res;
        })
  }

  slideToggle() {
    this.isToggle = !this.isToggle;
  }

  selectUserFilter(p) {
    console.log(p);
    this.leftnavservice.showSavedFilterControls(JSON.parse(p.filterDetails));
  }


}


