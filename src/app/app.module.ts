import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SqlServerService } from './sql-server.service';
import { TreeModule } from 'angular-tree-component';
import { ValueByKeyPipe } from './value-by-key.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ValueByKeyPipe
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
