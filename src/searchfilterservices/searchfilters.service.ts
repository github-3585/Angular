import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISearchFilters} from '../app/searchfilters/ISearchFilters';
import {ISubFilters} from '../app/searchfilters/ISubFilters';

import 'rxjs/add/operator/map';
import { clsSavedFilters } from '../app/searchfilters/ISavedFilters';


@Injectable()
export class SearchFiltersService
{   _headers : HttpHeaders;
    constructor(private _http: HttpClient){
        this._headers = new HttpHeaders();
        this._headers.append('Access-Control-Allow-Origin' , '*');
        this._headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this._headers.append('Accept','application/json');
        this._headers.append('content-type','application/json');
    }

    GetFiltersList(): Observable<ISearchFilters[]>
    {
      return this._http.get("http://localhost:52200/api/SearchFilters/GetSearchFilters",{headers:this._headers})
                       .map((value: ISearchFilters[])=>  value);
              
    }
   
    getGridData()
    {
       return [
            {Client: 'BS Client',  AccountNumber: '123123', ExceptionType: 'Wrong Account'},
            {Client: 'BS Client', AccountNumber: '2342', ExceptionType: 'Processing InComplete'},
            {Client: 'BS Client',  AccountNumber: '45234', ExceptionType: 'Wrong Month'},
            {Client: 'BS Client', AccountNumber: '567567', ExceptionType: 'Wrong Account'},
            {Client: 'BS Client', AccountNumber: '67853', ExceptionType: 'Wrong Month'},
            {Client: 'BS Client',  AccountNumber: '56747', ExceptionType: 'Wrong Month'},
            {Client: 'BS Client',AccountNumber: '23424', ExceptionType: 'Wrong Month'},
          ];
    }
    GetSavedFiltersList(): Observable<ISearchFilters[]>
    {
      return this._http.get("http://localhost:52200/api/SearchFilters/GetSavedFiltersList",{headers:this._headers})
                       .map((value: ISearchFilters[])=>  value);
              
    }
    bindSubFilters(strlookupSP): Observable<ISubFilters[]>
    {

        return this._http.get("http://localhost:52200/api/SearchFilters/GetFiltersList?LookupSP="+ strlookupSP ,{headers:{"contentType": "appplication/json"}})
                       .map((value: ISubFilters[])=>  value);
        

    }

    // saveUserTemplateDetails(obj): Observable<clsSavedFilters> {
    //     return this._http.post("http://localhost:52200/api/SearchFilters/SaveFiltersDetails", obj)
    //     .map((value: clsSavedFilters)=>  value);
        

    // }



}