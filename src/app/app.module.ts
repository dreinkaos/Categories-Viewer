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
import { MatSnackBarModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatRadioModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifyCategoriesComponent } from './modify-categories/modify-categories.component';
import { FilterOptionsByStatePipe } from './filter-options-by-state.pipe';

@NgModule({ 
  declarations: [
    AppComponent,
    ValueByKeyPipe,
    ArticleComponent,
    DropdownWithFilterComponent,
    FilterOptionsByValuePipe,
    CategoryComponent,
    CategoriesTreeComponent,
    ModifyCategoriesComponent,
    FilterOptionsByStatePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TreeModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [SqlServerService, SqliteService, ValueByKeyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
