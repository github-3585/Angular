import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { LeftnavService } from '../../searchfilterservices/leftnav.service';
import { clsSavedFilters, ArrayFilterDetails } from '../searchfilters/ISavedFilters';

@Component({
  selector: 'app-TemplateSave',
  templateUrl: './TemplateSave.component.html',
  styleUrls: ['./TemplateSave.component.css']
})
export class TemplateSaveComponent implements OnInit {
  templatename;
  public objsavedFilters:clsSavedFilters;
  public objarrayFilterDetails:ArrayFilterDetails;
  leftNavTemplatenames
  yesClose = false;
  constructor(
    public dialogRef: MatDialogRef<TemplateSaveComponent>,
    private leftnavService: LeftnavService,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit() {
    this.leftnavService.getTemplateNames().subscribe(prevData => {
      console.log(1)
      this.leftNavTemplatenames = prevData;
     });
  }

  saveTemplateName() {
    this.data.templatename = this.templatename;
    
    let resData = this.data;
   
    if(resData.items.length > 0){
       
      let objArrayFilterDetails:ArrayFilterDetails[] = []; 
      resData.items.forEach((item) => {
            objArrayFilterDetails.push({name: item.placeholder,data:item.select});
       })
      let objsavedFilters = {
            UserFilterName : resData.templatename,
            CreatedBy : "üser",
            IsSystemGenerated : 0,
            Filterdetails : JSON.stringify( objArrayFilterDetails)
      }
     this.leftnavService.saveUserTemplateDetails(objsavedFilters).subscribe(res => {
         //this.leftnavService.getTemplateNames().subscribe(prevData => {
          this.leftnavService.addLatestTemplateName([...this.leftNavTemplatenames, res]);
          this.yesClose = true;
         //});
        
       }); 
        
      
       
    }
  
  }



}
