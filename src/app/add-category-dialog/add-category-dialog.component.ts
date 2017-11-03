import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {

  showErrors: boolean = false;
  categoriesNames: string[] = [];
  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  private sanitiseText(text:string){
    return text.trim().toLowerCase();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isValidName(){   
    var sanitisedText = this.sanitiseText(this.data.categoryName);
    if (this.data.categories.indexOf(sanitisedText) > -1){
      this.showErrors = true;
    }
    else{
      this.showErrors = false;
    }
  }
}
