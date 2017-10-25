import { Component, OnInit } from '@angular/core';
import { SqlServerService } from './sql-server.service';
import { SqliteService } from './sqlite.service';
import { AppConfigurations } from './app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ROOTLEVEL: string = AppConfigurations.ROOTLEVEL;
  SECONDLEVEL: string = AppConfigurations.SECONDLEVEL;
  THIRDLEVEL: string = AppConfigurations.THIRDLEVEL;
  COLUMNS = AppConfigurations.COLUMNS;
  
  categories = {ROOTLEVEL:[], SECONDLEVEL:[], THIRDLEVEL:[]};
  originalItems = [];
  newItems = [];
  originalItemsDictionary = {};
  newItemsDictionary = {};
  selectedNode: any;
  nodes = [];  
  
  constructor(private sqlService: SqlServerService, private sqliteService: SqliteService){}

  onSelectedArticleChange(value){
    for (var index in this.newItems){
      if (this.newItems[index].ARCODART === value.ARCODART){
        this.newItems[index] = value;
        break;
      }
    }        
  }

  private getCategoriesFilter(node){
    var nodeType = node.data.type;

    var rootFilter;
    var secondFilter;
    var thirdFilter;
    var newRootLevelValue = node.data[this.ROOTLEVEL];
    var newSecondLevelValue = node.data[this.SECONDLEVEL];
    var newThirdLevelValue = node.data[this.THIRDLEVEL];
    console.log("node for filter", node);
    if (nodeType == this.ROOTLEVEL){
        //no need to look for ancestors
        rootFilter = node.data.name;
    }
    else if (nodeType == this.SECONDLEVEL){
        //we need to look for parent
        secondFilter = node.data.name;
        rootFilter = node.parent.data.name;
    }
    else{
        //we need to look for both parent and grandparent
        thirdFilter = node.data.name;
        secondFilter = node.parent.data.name;
        rootFilter = node.parent.parent.data.name;
    }
    return {rootFilter: rootFilter, secondFilter: secondFilter, thirdFilter: thirdFilter}
  }

  onSelectedCategoryChange(node){
    var type = node.data.type;
    var value = node.data.name;
    
    var filters = this.getCategoriesFilter(node);
    console.log(filters);
    for (var index in this.newItems)
    {
      if (filters.rootFilter != undefined && filters.rootFilter != this.newItems[index][this.ROOTLEVEL])
        continue;
      if (filters.secondFilter != undefined && filters.secondFilter != this.newItems[index][this.SECONDLEVEL])
        continue;
      if (filters.thirdFilter != undefined && filters.thirdFilter != this.newItems[index][this.THIRDLEVEL])
        continue;

      if (node.data[this.ROOTLEVEL] != undefined)
        this.newItems[index][this.ROOTLEVEL] = node.data[this.ROOTLEVEL];
      if (node.data[this.SECONDLEVEL] != undefined)
        this.newItems[index][this.SECONDLEVEL] = node.data[this.SECONDLEVEL]
      if (node.data[this.THIRDLEVEL] != undefined)
        this.newItems[index][this.THIRDLEVEL] = node.data[this.THIRDLEVEL];
    }
    this.newItemsDictionary = this.dictionaryFromData(this.newItems);  
  }

  saveCategories(){
    this.sqliteService.setBasicResource("articles", this.newItems);      
  }
  
  private getData(): void {
    Promise.all([
      this.sqliteService.getBasicResource("articles").then(data => this.newItems = data),
      this.sqlService.getItems().then(data => this.originalItems = data),
      this.sqlService.getHomogeneousCategories().then(data => this.categories[this.ROOTLEVEL] = data),
      this.sqlService.getFamilyCategories().then(data => this.categories[this.SECONDLEVEL] = data),      
      this.sqlService.getMerceologicalCategories().then(data => this.categories[this.THIRDLEVEL] = data)
    ]).then(()=>{
      this.originalItemsDictionary = this.dictionaryFromData(this.originalItems);
      if (this.isEmptyObject(this.newItems)){
         this.newItems = JSON.parse(JSON.stringify(this.originalItems));         
      }
      this.newItemsDictionary = this.dictionaryFromData(this.newItems);
    });
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  private dictionaryFromData(data: any): any{
    var temporaryDict = {};
    for (var index in data){
        var rootProperty: string = data[index][this.ROOTLEVEL];
        var secondProperty: string = data[index][this.SECONDLEVEL];
        var thirdProperty: string = data[index][this.THIRDLEVEL];
        if (!(rootProperty in temporaryDict)){
          temporaryDict[rootProperty] = {};            
        }
        if (!(secondProperty in temporaryDict[rootProperty])){
          temporaryDict[rootProperty][secondProperty] = {};            
        }
        if (!(thirdProperty in temporaryDict[rootProperty][secondProperty])){
          temporaryDict[rootProperty][secondProperty][thirdProperty] = [];            
        }
        temporaryDict[rootProperty][secondProperty][thirdProperty].push(data[index]);
    }
    return temporaryDict;
  }

  ngOnInit(): void {
    this.getData();
  }
}
