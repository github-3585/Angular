import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { TemplateSaveComponent } from '../TemplateSave/TemplateSave.component';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import {map, startWith} from 'rxjs/operators';
import { SearchFiltersService } from '../../searchfilterservices/searchfilters.service'
import { LeftnavService } from './../../../src/searchfilterservices/leftnav.service';
import { ISearchFilters } from './ISearchFilters';


@Component({
  selector: 'app-searchfilters',
  templateUrl: './searchfilters.component.html',
  styleUrls: ['./searchfilters.component.css'],
})

export class SearchfiltersComponent implements OnInit {
  formGroup : FormGroup;
  populateSeletedData;
 
  items: FormArray;
  searchCtrl = new FormControl();
  filterOptions: Observable<any[]>;
  filters: ISearchFilters[];
  
  gridData;
  searchData;
  anyGroups;
  exceptionTypesList;
  dynData;
  isExceptionTypes = false;
  isState=false;
  isAccountNumber=false;
  isClient=false;
  isCheckAll=false;
  lookupSP;
  resData;
  public show:boolean = false;

  public ExceptionData;
  public StateData;
  public AccountData;
  public ClientData;

  displayedColumns: string[] = ['Client', 'AccountNumber', 'ExceptionType', 'State'];
  dataSource;
  constructor(public formBuilder: FormBuilder,public dialog: MatDialog,public _searchFilterService: SearchFiltersService, private leftnavservice: LeftnavService) 
  { 
      _searchFilterService.GetFiltersList().subscribe(
        res=>{ this.filters=res
        });
     this.gridData= _searchFilterService.getGridData();
     this.dataSource=this.gridData;
  }

    filteredOptions: Observable<any[]>;

    ngOnInit() {
      this.BuildForm();
      this.filteredOptions = this.searchCtrl.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.viewValue),
          map(viewValue => viewValue ? this._filter(viewValue) : this.searchData.slice())
        );

        this.generateSavedFilterControls();
        
    }
  
    displayFn(any?: any): string | undefined {
      return any ? any.viewValue : undefined;
    }
  
    private _filter(viewValue: string): any[] {
      const filterValue = viewValue.toLowerCase();
  
      return this.searchData.filter(option => option.viewValue.toLowerCase().indexOf(filterValue) === 0);
    }
  

  BuildForm() {
   this.formGroup = this.formBuilder.group({
      more: ['', [Validators.required]],
      items: this.formBuilder.array([ ])
    });
    this.items = this.formGroup.get('items') as FormArray;
  }
  remove(i)
  {
    this.items.controls.splice(i,1)
  }

  onSelectChange(e) {
    
    if (e.value.value === 'Exception Type' && this.isExceptionTypes == false && this.ExceptionData == undefined) { this.lookupSP='cbmsCuExceptionType_GetAll'};
     if (e.value.value === 'State' && this.isState  == false && this.StateData == undefined) {this.lookupSP='State_Sel_By_Client_Id_State_Name'};
     if (e.value.value === 'Account Number' && this.isAccountNumber  == false && this.AccountData == undefined) {this.lookupSP='cbmsAccount_GetByClient'};
     if (e.value.value === 'Client' && this.isClient  == false && this.ClientData == undefined) {this.lookupSP='GET_CLIENT_LIST_P'};
     console.log(this.lookupSP);
    
      if(this.lookupSP!=="") {
        this._searchFilterService.bindSubFilters(this.lookupSP).subscribe(
          res=>{ 
            console.log(res)

            if (e.value.value === 'Exception Type') {this.ExceptionData=res;}
            if (e.value.value === 'State') {this.StateData=res;}
            if (e.value.value === 'Account Number') {this.AccountData=res;}
            if (e.value.value === 'Client') {this.ClientData=res;}

            this.items.push(
              this.formBuilder.group({
                select: '',
                data: [res],
                placeholder:e.value.value
              })
            );
          });
          this.show = true;
          this.lookupSP="";
          this.isExceptionTypes = true;  
        }
        else if(this.lookupSP =="")
        {  
          if (e.value.value === 'Exception Type') {this.resData = this.ExceptionData;}
          if (e.value.value === 'State') {this.resData =this.StateData}
          if (e.value.value === 'Account Number') {this.resData =this.AccountData}
          if (e.value.value === 'Client') {this.resData = this.ClientData}

          this.items.push(
            this.formBuilder.group({
              select: '',
              data: [this.resData],
              placeholder:e.value.value
            })
          );
        }



        if (e.value.value === 'Exception Type') {this.isExceptionTypes= true};
        if (e.value.value === 'State') {this.isState=true}
        if (e.value.value === 'Account Number') {this.isAccountNumber=true};
        if (e.value.value === 'Client') {this.isClient=true};
    }


    createSavedFilters(filterType, data) {
      this.items.controls=[];
      this.isExceptionTypes =false;
      this.isState =false;
      this.isAccountNumber  = false;
      this.isClient  = false;

      if (filterType === 'Exception Type' && this.isExceptionTypes  == false) {this.lookupSP='cbmsCuExceptionType_GetAll'};
      if (filterType === 'State' && this.isState  == false) {this.lookupSP='State_Sel_By_Client_Id_State_Name'};
      if (filterType === 'Account Number' && this.isAccountNumber  == false) {this.lookupSP='cbmsAccount_GetByClient'};
      if (filterType === 'Client' && this.isClient  == false) {this.lookupSP='GET_CLIENT_LIST_P'};
      if(this.lookupSP!=="")
      {
        this._searchFilterService.bindSubFilters(this.lookupSP).subscribe(
          res=>{ 
            this.items.push(
              this.formBuilder.group({
                select: [[...data]],
                data: [res],
                placeholder:filterType
              })
            );
          });
       this.show = true;
       this.lookupSP="";
        this.isExceptionTypes = true;  
      }
       
     if (filterType === 'Exception Type') {this.isExceptionTypes= true};
     if (filterType === 'State') {this.isState=true}
     if (filterType === 'Account Number') {this.isAccountNumber=true};
     if (filterType === 'Client') {this.isClient=true};
   
    }
    
 
  openDialog(): void {
    const dialogRef = this.dialog.open(TemplateSaveComponent, {
      width: '250px',
      data: this.formGroup.value
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log('The dialog was closed');
      //this.leftnavservice.save(this.formGroup.value)
    });
  }

  generateSavedFilterControls(){
    this.leftnavservice.getSavedFilterControls().subscribe(res => {
      if(res.length > 0){
        res.forEach( (v) => {
          this.createSavedFilters(v.name, v.data)
        })
      }
    })
  }


  save()
  {
    this.openDialog();
  }
}


