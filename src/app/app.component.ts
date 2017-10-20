import { Component, OnInit } from '@angular/core';
import { SqlServerService } from './sql-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ricategorizziamo!';
  rootLevel  = 'ARCATOMO'; //categoria omogenea
  secondLevel = 'ARCODFAM'; //famiglia
  thirdLevel = 'ARGRUMER'; //gruppo merceologico
  items = [];
  selectedNode: any;
  categories = {rootLevel:[], secondLevel:[], thirdLevel:[] };
   

  columns = {
    "ARCODART" : {"label": "Codice articolo"},
    "ARDESART" : {"label": "Articolo"},
    "ARGRUMER" : {"label": "Codice gruppo merceologico"},
    "GMDESCRI" : {"label": "Gruppo merceologico"},
    "ARCODFAM" : {"label": "Codice famiglia"},
    "FADESCRI" : {"label": "Famiglia"},
    "ARCATOMO" : {"label": "Codice categoria omogenea"},
    "OMDESCRI" : {"label": "Categoria omogenea"}    
  };

  nodes = [];  
  constructor(private sqlService: SqlServerService){}

  ngOnChanges(){
    this.generateTree();
  }
  onSelectedArticleChange(value){
    for (var index in this.items){
      if (this.items[index].ARCODART === value.ARCODART){
        this.items[index] = value;
        break;
      }
    }
    this.generateTree();
  }

  setSelectedNode(event){
    this.selectedNode = event.node;    
  }
  
  getData(): void {
    Promise.all([
      this.sqlService.getItems().then(data => this.items = data),
      this.sqlService.getFamilyCategories().then(data => this.categories[this.secondLevel] = data),
      this.sqlService.getHomogeneousCategories().then(data => this.categories[this.rootLevel] = data),
      this.sqlService.getMerceologicalCategories().then(data => this.categories[this.thirdLevel] = data)
    ]).then(()=>this.generateTree());
  }
  generateTree(){    
      this.nodes = [];
      var temporaryDict = {};
      for (var index in this.items){
          var rootProperty: string = this.items[index][this.rootLevel];
          var secondProperty: string = this.items[index][this.secondLevel];
          var thirdProperty: string = this.items[index][this.thirdLevel];
          if (!(rootProperty in temporaryDict)){
            temporaryDict[rootProperty] = {};            
          }
          if (!(secondProperty in temporaryDict[rootProperty])){
            temporaryDict[rootProperty][secondProperty] = {};            
          }
          if (!(thirdProperty in temporaryDict[rootProperty][secondProperty])){
            temporaryDict[rootProperty][secondProperty][thirdProperty] = [];            
          }
          temporaryDict[rootProperty][secondProperty][thirdProperty].push(this.items[index]);
      }
      var counter = 0;
      for (var key in temporaryDict){   
          counter += 1;                 
          var root = {id: counter, name: key, children: [], type: this.rootLevel};
          for (var secondKey in temporaryDict[key]){
            counter += 1;
            var second = {id:counter, name: secondKey, children: [], type: this.secondLevel};
            for (var thirdKey in temporaryDict[key][secondKey]){
              counter += 1;
              var third = {id:counter, name: thirdKey,  children: [], type: this.thirdLevel};
              for (var articleKey in temporaryDict[key][secondKey][thirdKey]){
                counter += 1;
                var child = {id:counter, name:temporaryDict[key][secondKey][thirdKey][articleKey].ARCODART, article:temporaryDict[key][secondKey][thirdKey][articleKey]}
                third.children.push(child);
              }              
              second.children.push(third);
            }
            root.children.push(second);
          }
          this.nodes.push(root);
      }    
  }  

  ngOnInit(): void {
    this.getData();

  }
}
