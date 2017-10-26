import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppConfigurations } from '../app-config';

@Component({
  selector: 'modify-categories',
  templateUrl: './modify-categories.component.html',
  styleUrls: ['./modify-categories.component.scss']
})
export class ModifyCategoriesComponent implements OnInit {

  
  @Input() categories: any;
  @Output() saveCategories = new EventEmitter<boolean>();
  obj: Object = Object;
  selectedRow: any;
  selectedCategory: string;
  columnsTranslations: any[] = AppConfigurations.COLUMNS;

  constructor() {}

  ngOnInit() {    
    this.selectedCategory = AppConfigurations.ROOTLEVEL;
  }

  save(){
    this.saveCategories.emit(this.categories);
  }
  
  setHighlighted(item, event){  
    this.selectedRow = item;     
  }

  /*setHighlighted(item, event){
    var itemIndex = this.highlightedRows.indexOf(item);
    if (itemIndex == -1){
      this.highlightedRows.push(item);
    }
    else{
      this.highlightedRows.splice(itemIndex, 1);
    }    
  }*/

}
