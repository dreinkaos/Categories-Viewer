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

  generateTree(){        
    this.nodes = [];
    var counter = 1;
    var titleRoot = {id: counter, name: this.COLUMNS[this.ROOTLEVEL].label, children: [], type: "title"};
    for (var key in this.data){   
        counter += 1;
        var root = {id: counter, name: key, children: [], type: this.ROOTLEVEL};
        counter += 1;
        root.children.push({id: counter, name: this.COLUMNS[this.SECONDLEVEL].label, children: [], type: "title"});
        for (var secondKey in this.data[key]){
          counter += 1;
          var second = {id:counter, name: secondKey, children: [], type: this.SECONDLEVEL};
          counter += 1;
          second.children.push({id: counter, name: this.COLUMNS[this.THIRDLEVEL].label, children: [], type: "title"});
          for (var thirdKey in this.data[key][secondKey]){
            counter += 1;
            var third = {id:counter, name: thirdKey,  children: [], type: this.THIRDLEVEL};
            for (var articleKey in this.data[key][secondKey][thirdKey]){
              counter += 1;
              var child = {id:counter, name:this.data[key][secondKey][thirdKey][articleKey].ARCODART, article:this.data[key][secondKey][thirdKey][articleKey]}
              third.children.push(child);
            }              
            second.children.push(third);
          }
          root.children.push(second);
        }
        this.nodes.push(root);
    }
    this.nodes.unshift(titleRoot);    
  }
}
