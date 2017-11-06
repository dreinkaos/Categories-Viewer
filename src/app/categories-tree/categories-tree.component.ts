import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppConfigurations } from '../app-config';
import { TreeComponent} from 'angular-tree-component';
import { ValueByKeyPipe } from '../value-by-key.pipe';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {
  
  selectedNode: any;
  nodes: any[];
  filter: string;
  options = {useVirtualScroll: true};
  ROOTLEVEL: string = AppConfigurations.ROOTLEVEL;
  SECONDLEVEL: string = AppConfigurations.SECONDLEVEL;
  THIRDLEVEL: string = AppConfigurations.THIRDLEVEL;
  COLUMNS = AppConfigurations.COLUMNS;
  modified: boolean = false;
  @ViewChild('tree') treeComponent: TreeComponent;  
  @Input() data;
  @Input() categories;
  @Input() readOnly?: boolean;
  @Input() parentSubject:Subject<any>;
  @Output() updateItemsCategoryInParent = new EventEmitter<boolean>();
  @Output() updateArticleCategoryInParent = new EventEmitter<boolean>();  
  @Output() saveArticlesInParent = new EventEmitter<boolean>();

  constructor(private valueByKeyPipe: ValueByKeyPipe) {}

  ngOnInit() {}

  transformText(node) {
    return this.valueByKeyPipe.transform(node.data.name, this.categories[node.data.type]);
  }

  filterNodes(filter: string){
    if (filter.length > 2){
      this.treeComponent.treeModel.filterNodes((node) => {
        var nodeText = this.transformText(node);        
        return nodeText.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
    else{
      this.treeComponent.treeModel.clearFilter();    
    }
  }

  ngOnChanges(){
    if (this.parentSubject){
        this.parentSubject.subscribe(event => {
        if (this.selectedNode){
          this.selectedNode.setIsActive(false);        
        }     
        this.treeComponent.treeModel.virtualScroll.setViewport(this.treeComponent.treeModel.virtualScroll.viewport);   
      });
    }    
    this.generateTree();   
  }

  saveArticles(){
    this.saveArticlesInParent.emit(true);
    this.modified = false;
  }

  updateItemsCategory(node){
    this.updateItemsCategoryInParent.emit(node);  
    this.modified = true;     
    node.setIsActive(false);    
  }

  updateArticleCategory(node){
    this.updateArticleCategoryInParent.emit(node);
    this.modified = true;    
  }

  setSelectedNode(event){
    if (event.node.data.type == 'title'){
      event.node.findNextNode(true).setIsActive(true);
      event.node.findNextNode(true).focus();
    }
    else{      
      var nodeType = event.node.data.type;
      if (nodeType == this.ROOTLEVEL){
        event.node.data[this.ROOTLEVEL] = event.node.data.name;
      }
      else if (nodeType == this.SECONDLEVEL){
        event.node.data[this.SECONDLEVEL] = event.node.data.name;
        event.node.data[this.ROOTLEVEL] = event.node.parent.data.name;
      }
      else{
        event.node.data[this.THIRDLEVEL] = event.node.data.name;
        event.node.data[this.SECONDLEVEL] = event.node.parent.data.name;
        event.node.data[this.ROOTLEVEL] = event.node.parent.parent.data.name;
      }
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
