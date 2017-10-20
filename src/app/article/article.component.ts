import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() node;
  @Input() categories;
  @Output() updateArticle = new EventEmitter<boolean>();

  constructor() {}

  confirmChanges(event){
    this.updateArticle.emit(this.node.data.article);
  }

  ngOnInit() {
  }

}
