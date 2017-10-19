import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SqlServerService } from './sql-server.service';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TreeModule
  ],
  providers: [SqlServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
