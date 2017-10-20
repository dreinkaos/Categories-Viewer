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
  constructor() {}

  confirmChanges(event){
    this.updateArticle.emit(this.node.data.article);
  }

  onSelectChange(value, reference){
    this.node.data.article[reference] = value;
  }

  ngOnInit() {}

}
