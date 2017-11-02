import { Component, OnInit } from '@angular/core';
import { SqlServerService } from './sql-server.service';
import { SqliteService } from './sqlite.service';
import { AppConfigurations } from './app-config';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ROOTLEVEL: string = AppConfigurations.ROOTLEVEL;
  SECONDLEVEL: string = AppConfigurations.SECONDLEVEL;
  THIRDLEVEL: string = AppConfigurations.THIRDLEVEL;  
  loading: boolean = true;
  categories = {};
  originalItems = [];
  newItems = [];
  originalItemsDictionary = {};
  newItemsDictionary = {};
  selectedNode: any;
  nodes = [];  

  parentSubject:Subject<any> = new Subject();
  
  constructor(private sqlService: SqlServerService, private sqliteService: SqliteService, public messageBox: MatSnackBar){}

  showMessage(message: string, action: string) {
    this.messageBox.open(message, action, {
      duration: 3000,
    });
  }

  pageChanged() {
    this.parentSubject.next('Page changed');
  }

  onSelectedArticleChange(value){
    for (var index in this.newItems){
      if (this.newItems[index].ARCODART === value.ARCODART){
        console.log(value, this.newItems[index])
        this.newItems[index] = value;
        break;
      }
    }       
    this.newItemsDictionary = this.dictionaryFromData(this.newItems); 
  }

  private getCategoriesFilter(node){
    var nodeType = node.data.type;

    var rootFilter;
    var secondFilter;
    var thirdFilter;
    var newRootLevelValue = node.data[this.ROOTLEVEL];
    var newSecondLevelValue = node.data[this.SECONDLEVEL];
    var newThirdLevelValue = node.data[this.THIRDLEVEL];
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

  initializeDataToAdHocSituation(){
    Promise.all([
      this.sqlService.getHomogeneousCategories().then(data => this.categories[this.ROOTLEVEL] = data),
      this.sqlService.getFamilyCategories().then(data => this.categories[this.SECONDLEVEL] = data),      
      this.sqlService.getMerceologicalCategories().then(data => this.categories[this.THIRDLEVEL] = data),
      this.sqliteService.setResource("articles", this.newItems), 
      this.sqliteService.setResource("homogeneousCategories", this.categories[this.ROOTLEVEL]),
      this.sqliteService.setResource("familyCategories", this.categories[this.SECONDLEVEL]) ,
      this.sqliteService.setResource("merceologicalCategories", this.categories[this.THIRDLEVEL]) 
    ]).then(()=> this.setActiveCategories);    
  }

  private setActiveCategories(){
      for (var index in this.newItems){
        for (var ii in this.categories[this.ROOTLEVEL]){
          if (this.categories[this.ROOTLEVEL][ii].key == this.newItems[index][this.ROOTLEVEL]){
            this.categories[this.ROOTLEVEL][ii].active = true;            
          }
        }

        for (var ii in this.categories[this.SECONDLEVEL]){
          if (this.categories[this.SECONDLEVEL][ii].key == this.newItems[index][this.SECONDLEVEL]){
            this.categories[this.SECONDLEVEL][ii].active = true;
          }
        }

        for (var ii in this.categories[this.THIRDLEVEL]){
          if (this.categories[this.THIRDLEVEL][ii].key == this.newItems[index][this.THIRDLEVEL]){
            this.categories[this.THIRDLEVEL][ii].active = true;
          }
        }        
      }

      for (var ii in this.categories[this.ROOTLEVEL]){        
          if (!this.categories[this.ROOTLEVEL][ii].active)
            this.categories[this.ROOTLEVEL][ii].active = false;                    
      }

      for (var ii in this.categories[this.SECONDLEVEL]){
          if (!this.categories[this.SECONDLEVEL][ii].active)
            this.categories[this.SECONDLEVEL][ii].active = false;
        
      }

      for (var ii in this.categories[this.THIRDLEVEL]){        
          if (!this.categories[this.THIRDLEVEL][ii].active)
            this.categories[this.THIRDLEVEL][ii].active = false;
        
      }  


  }

  saveArticles(){
    this.sqliteService.setResource("articles", this.newItems).then(()=>this.showMessage("Dati salvati con successo!", null)); 
  }

  saveCategories(categories){
    
    for (var category in categories){
      var serviceName;
      if (category == 'ARGRUMER'){
        serviceName = "merceologicalCategories";        
      }
      else if (category == 'ARCATOMO'){
        serviceName = "homogeneousCategories";
      }
      else if (category == 'ARCODFAM'){
        serviceName = "familyCategories";
      }
      this.sqliteService.setResource(serviceName, this.categories[category]).then(()=>{
        this.categories[category] = categories[category];
        this.showMessage("Dati salvati con successo!", null);
      }); 
    }    
  }
  
  //TODO: refactory needed. Resource names shouldn't be hardcoded but configured.
  //      Best solution could be to have a config dictionary for each category including service names, column names and so on.
  //      Check this hint even for saveCategories method
  private getData(): void {
    Promise.all([
      this.sqlService.getItems().then(data => this.originalItems = data),
      this.sqliteService.getResource("articles").then(data => this.newItems = data),
      this.sqliteService.getResource("homogeneousCategories").then(data => this.categories[this.ROOTLEVEL] = data),
      this.sqliteService.getResource("familyCategories").then(data => this.categories[this.SECONDLEVEL] = data),      
      this.sqliteService.getResource("merceologicalCategories").then(data => this.categories[this.THIRDLEVEL] = data)      
    ]).then(()=>{
      this.originalItemsDictionary = this.dictionaryFromData(this.originalItems);
      if (this.isEmptyObject(this.newItems)){
         this.newItems = JSON.parse(JSON.stringify(this.originalItems));         
      }
      this.newItemsDictionary = this.dictionaryFromData(this.newItems);
      this.loading = false;
      //this.setActiveCategories();      
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
