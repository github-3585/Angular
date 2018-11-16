import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';

import { DropdownModule } from 'angular-custom-dropdown';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule, MatTableModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatAutocompleteModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { SearchfiltersComponent } from './searchfilters/searchfilters.component';
import { TemplateSaveComponent } from './TemplateSave/TemplateSave.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFiltersService } from '../searchfilterservices/searchfilters.service';



@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    SearchfiltersComponent,
    TemplateSaveComponent,
    LeftNavComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule
  ],
  entryComponents:[TemplateSaveComponent],
  providers: [SearchFiltersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
