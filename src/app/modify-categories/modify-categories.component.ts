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
  obj: Object = Object;
  selectedRow: any;
  selectedCategory: string;
  oldValue: string;
  modified: boolean = false;
  columnsTranslations: any[] = AppConfigurations.COLUMNS;
  private subject: Subject<string> = new Subject();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '400px',
      data: { categoryName: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);      
    });
  }

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

  onSlideChange(category){
    this.modified = true;
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
