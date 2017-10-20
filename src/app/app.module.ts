import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SqlServerService } from './sql-server.service';
import { TreeModule } from 'angular-tree-component';
import { ValueByKeyPipe } from './value-by-key.pipe';
import { ArticleComponent } from './article/article.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ValueByKeyPipe,
    ArticleComponent    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TreeModule,
    FormsModule
  ],
  providers: [SqlServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
