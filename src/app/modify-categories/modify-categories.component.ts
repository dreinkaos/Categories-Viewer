import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
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
  @Output() forceSave = new EventEmitter<boolean>();
  obj: Object = Object;
  selectedRow: any;
  selectedCategory: string;
  oldValue: string;
  modified: boolean = false;
  columnsTranslations: any[] = AppConfigurations.COLUMNS;
  private subject: Subject<string> = new Subject();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    var categoriesNames = this.categories[this.selectedCategory].map(category => this.sanitiseText(category.value));
    var categoriesKeys = this.categories[this.selectedCategory].map(category => this.sanitiseText(category.key));
    let dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '400px',
      data: { categoryName: "", categories: categoriesNames}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        var key = this.getUniqueIDForCategory(result, categoriesKeys);
        this.categories[this.selectedCategory].unshift({"key":key, "value":result, "active":true});
        this.setModified(true);
      }      
    });
  }

  private setModified(flag: boolean){
    this.modified = flag;
    if (this.modified === true){
      this.forceSave.emit(true);      
    }
    else{
      this.forceSave.emit(false);
    }
  }

  private getUniqueIDForCategory(categoryName: string, categoriesKeys: string[]){
    var text = categoryName.slice(0, 5);
    if (categoriesKeys.indexOf(text) == -1){
      return text
    }
    else{
      return this.getUniqueIDForCategory(categoryName.substring(1), categoriesKeys);
    }
  }

  private sanitiseText(text: string){
    return text.trim().toLowerCase();
  }

  ngOnInit() {    
    this.selectedCategory = AppConfigurations.ROOTLEVEL;
    this.subject.debounceTime(200).subscribe(item => {
      this.setHighlighted(item);
    });
  }

  save(){
    this.saveCategories.emit(this.categories);
    this.setModified(false);
  }

  onItemClick(item){
    this.subject.next(item);
  }

  onSlideChange(category){
    this.setModified(true);
  }

  restoreAndClick(item){
    item.value = this.oldValue;
    this.onItemClick(item);
  }
  
  setHighlighted(item){ 
    if (this.selectedRow == item){
      if (item.value != this.oldValue)
      {
        this.setModified(true);
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
