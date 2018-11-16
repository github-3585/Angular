import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/internal/operators/take';
import { clsSavedFilters, ArrayFilterDetails } from './../app/searchfilters/ISavedFilters';
import { SearchFiltersService } from './searchfilters.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeftnavService {
  public objsavedFilters:clsSavedFilters;
  public objarrayFilterDetails:ArrayFilterDetails;
  constructor(private _http: HttpClient, public _searchFilterService: SearchFiltersService) { }

  savedControlsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  savedControlsList: Observable<any> =  this.savedControlsArray.asObservable();

  savedTemplateName: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  savedTemplateNameList: Observable<any> =  this.savedTemplateName.asObservable();

  saveUserTemplateDetails(obj): Observable<clsSavedFilters> {
    return this._http.post("http://localhost:52200/api/SearchFilters/SaveFiltersDetails", obj)
    .map((value: clsSavedFilters)=>  value);
  }
  
  showSavedFilterControls(item) {
    this.savedControlsList.pipe(take(1)).subscribe(val => {
      this.savedControlsArray.next(item);
    });
  }

  getSavedFilterControls () { return this.savedControlsArray }

  addLatestTemplateName (data) {
    this.savedTemplateNameList.pipe(take(1)).subscribe(val => {
      this.savedTemplateName.next(data);
    })
  }

  getTemplateNames (){ return this.savedTemplateName};
  

  
  
}


