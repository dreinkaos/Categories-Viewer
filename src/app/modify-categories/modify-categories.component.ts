import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppConfigurations } from '../app-config';
import { Subject } from 'rxjs';

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
  oldValue: string;
  modified: boolean = false;
  columnsTranslations: any[] = AppConfigurations.COLUMNS;
  private subject: Subject<string> = new Subject();

  constructor() {}

  ngOnInit() {    
    this.selectedCategory = AppConfigurations.ROOTLEVEL;
    this.subject.debounceTime(200).subscribe(item => {
      this.setHighlighted(item);
    });
  }

  save(){
    this.saveCategories.emit(this.categories);
  }

  onItemClick(item){
    this.subject.next(item);
  }

  restoreAndClick(item){
    item.value = this.oldValue;
    this.onItemClick(item);
  }
  
  setHighlighted(item){ 
    if (this.selectedRow == item){
      if (item.value != this.oldValue)
      {
        this.modified = true;
      }      
      this.selectedRow = null;
      this.oldValue = null;      
    }
    else{
      this.selectedRow = item;    
      this.oldValue = item.value;       
    }    
  }
}
