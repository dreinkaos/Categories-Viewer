import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown-with-filter',
  templateUrl: './dropdown-with-filter.component.html',
  styleUrls: ['./dropdown-with-filter.component.scss']
})
export class DropdownWithFilterComponent implements OnInit {

  @Input() label: string;
  @Input() reference: any;
  @Input() values: any;
  @Output() selectionChanged = new EventEmitter<boolean>();
  value: string;

  constructor() { }

  ngOnInit() {}

  onSelectChange(event){     
     this.selectionChanged.emit(this.reference);
  }
}
