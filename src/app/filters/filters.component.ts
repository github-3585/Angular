import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor() { }
  @Input('title') title;
  isChecked=true;
  filter=1;

  selectedValue: string;

  ngOnInit() { }
 
  onChange(event)
  {
     console.log(event);
  }


  Filters=[
    { id:1, Type:'Invoice_Exception_queue'},
    { id:2, Type:'Budget_queue'},
    { id:3, Type:'Invoice Collection Queue'}
  ]

  // formRoot : FormGroup = new FormGroup({
  //   select: new FormControl(null)
  // })
  
  formValues : any = {};
  
  controls: any = [
    'select'
  ];
  
  
}
