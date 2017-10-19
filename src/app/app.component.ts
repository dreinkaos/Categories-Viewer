import { Component, OnInit } from '@angular/core';
import { SqlServerService } from './sql-server.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test with middleware service layer';
  rootLevel  = 'ARCATOMO';
  secondLevel = 'ARCODFAM';
  thirdLevel = 'ARGRUMER';
  

  data = [];
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
    
  //nodes example
  nodes = [];  
  constructor(private sqlService: SqlServerService){}

  ngOnChanges(){
    this.getData();
  }

  clickEvent(event, nodedata){
    console.log(nodedata);
  }

  getData(): void {
    this.sqlService.getItems().then((data) => {
      this.nodes = [];
      var temporaryDict = {};
      for (var index in data){
          var rootProperty: string = data[index][this.rootLevel];
          var secondProperty: string = data[index][this.secondLevel];
          var thirdProperty: string = data[index][this.thirdLevel];
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

      var counter = 0;
      for (var key in temporaryDict){   
          counter += 1;       
          var root = {id: counter, name: key, children: []};
          for (var secondKey in temporaryDict[key]){
            counter += 1;
            var second = {id:counter, name: secondKey, children: []};
            for (var thirdKey in temporaryDict[key][secondKey]){
              counter += 1;
              var third = {id:counter, name: thirdKey,  children: []};
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
    });
  }  

  ngOnInit(): void {
    this.getData();

  }
}
