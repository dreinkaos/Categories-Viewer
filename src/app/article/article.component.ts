import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() node;
  @Input() categories;
  
  constructor() {}

  ngOnInit() {
  }

}
