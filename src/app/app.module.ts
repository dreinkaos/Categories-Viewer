import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SqlServerService } from './sql-server.service';
import { SqliteService} from './sqlite.service'
import { TreeModule } from 'angular-tree-component';
import { ValueByKeyPipe } from './value-by-key.pipe';
import { ArticleComponent } from './article/article.component';
import { FormsModule } from '@angular/forms';
import { DropdownWithFilterComponent } from './dropdown-with-filter/dropdown-with-filter.component';
import { FilterOptionsByValuePipe } from './filter-options-by-value.pipe';
import { CategoryComponent } from './category/category.component';
import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ValueByKeyPipe,
    ArticleComponent,
    DropdownWithFilterComponent,
    FilterOptionsByValuePipe,
    CategoryComponent,
    CategoriesTreeComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TreeModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [SqlServerService, SqliteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
