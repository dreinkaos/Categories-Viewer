import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppConfigurations } from '../app-config';
@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() node;
  @Input() categories; 
  @Output() updateItemsCategory = new EventEmitter<boolean>();

  ROOTLEVEL: string = AppConfigurations.ROOTLEVEL;
  SECONDLEVEL: string = AppConfigurations.SECONDLEVEL;
  THIRDLEVEL: string = AppConfigurations.THIRDLEVEL;
  selectionHasChanged: boolean = false;
  oldReferences: any = {};
  constructor() { }

  ngOnInit() {
  }

  confirmChanges(event){
    this.updateItemsCategory.emit(this.node);
    this.node = undefined;
    this.selectionHasChanged = false;
  }

  onSelectChange(value, reference){
    this.oldReferences[reference] = this.node.data[reference];
    this.node.data[reference] = value;  
    this.selectionHasChanged = true;
  }

  reject(event){
    for (var reference in this.oldReferences){
      this.node.data[reference] = this.oldReferences[reference];
    }
    this.selectionHasChanged = false;
  }
}
