import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SqliteService {
  private address: string = "http://localhost:3000";
  constructor(private http: Http) { }

  getItems(): Promise<any[]> {
    return this.http.get(this.address + "/getLatestCategoriesSaved")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }  

  saveNewCategories(categories:any): Promise<boolean>{
    const body = {categories: categories};    
    return this.http.post(this.address + "/saveNewCategories", body)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
