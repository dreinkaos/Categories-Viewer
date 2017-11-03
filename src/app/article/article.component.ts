import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { AppConfigurations } from '../app-config';
@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() node;
  @Input() categories;
  @Output() updateArticle = new EventEmitter<boolean>();

  ROOTLEVEL: string = AppConfigurations.ROOTLEVEL;
  SECONDLEVEL: string = AppConfigurations.SECONDLEVEL;
  THIRDLEVEL: string = AppConfigurations.THIRDLEVEL;
  selectionHasChanged: boolean = false;
  oldReferences: any = {};
  constructor() {}

  confirmChanges(event){
    this.updateArticle.emit(this.node.data.article);
    this.node = undefined;
    this.selectionHasChanged = false;
  }

  onSelectChange(value, reference){
    this.oldReferences[reference] = this.node.data.article[reference];
    this.node.data.article[reference] = value;
    this.selectionHasChanged = true;
  }
  
  reject(event){
    for (var reference in this.oldReferences){
      this.node.data.article[reference] = this.oldReferences[reference];
    }
    this.selectionHasChanged = false;
  }

  ngOnInit() {}

}
