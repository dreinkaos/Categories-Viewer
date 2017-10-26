import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppConfigurations } from '../app-config';

@Component({
  selector: 'categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {
  
  selectedNode: any;
  nodes: any[];
  
  ROOTLEVEL: string = AppConfigurations.ROOTLEVEL;
  SECONDLEVEL: string = AppConfigurations.SECONDLEVEL;
  THIRDLEVEL: string = AppConfigurations.THIRDLEVEL;
  COLUMNS = AppConfigurations.COLUMNS;

  @Input() data;
  @Input() categories;
  @Input() readOnly?: boolean;
  @Output() updateItemsCategoryInParent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  ngOnChanges(){
    this.generateTree();    
  }

  updateItemsCategory(node){
    this.updateItemsCategoryInParent.emit(node);       
    node.setIsActive(false);    
  }

  setSelectedNode(event){
    if (event.node.data.type == 'title'){
      event.node.findNextNode(true).setIsActive(true);
      event.node.findNextNode(true).focus();
    }
    else{
      this.selectedNode = event.node;    
    }    
  }

  private getColumnLabelByKey(key: string): string {
    var columns = this.COLUMNS.filter(x => x.key == key);    
    return columns[0].value;
  }

  private generateTree(){        
    this.nodes = [];
    var counter = 1;
    var titleRoot = {id: counter, name: this.getColumnLabelByKey(this.ROOTLEVEL), children: [], type: "title"};
    for (var key in this.data){   
        counter += 1;
        var root = {id: counter, name: key, children: [], type: this.ROOTLEVEL, numberOfArticles:0};
        counter += 1;
        root.children.push({id: counter, name: this.getColumnLabelByKey(this.SECONDLEVEL), children: [], type: "title"});
        for (var secondKey in this.data[key]){
          counter += 1;
          var second = {id:counter, name: secondKey, children: [], type: this.SECONDLEVEL, numberOfArticles:0};
          counter += 1;
          second.children.push({id: counter, name: this.getColumnLabelByKey(this.THIRDLEVEL), children: [], type: "title"});
          for (var thirdKey in this.data[key][secondKey]){
            counter += 1;
            var third = {id:counter, name: thirdKey,  children: [], type: this.THIRDLEVEL, numberOfArticles:0};
            for (var articleKey in this.data[key][secondKey][thirdKey]){
              counter += 1;
              var child = {id:counter, name:this.data[key][secondKey][thirdKey][articleKey].ARCODART, article:this.data[key][secondKey][thirdKey][articleKey]}
              third.children.push(child);
              third.numberOfArticles = third.children.length;
            }    
            second.numberOfArticles += third.children.length;          
            second.children.push(third);
          }
          root.numberOfArticles += second.numberOfArticles;
          root.children.push(second);
        }        
        this.nodes.push(root);
    }
    this.nodes.unshift(titleRoot);    
  }
}
