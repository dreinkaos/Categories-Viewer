import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfigurations } from './app-config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SqlServerService {

  private address: string = AppConfigurations.SERVER_ADDRESS;
  constructor(private http: Http) { }

  getItems(): Promise<any[]> { 
    return this.http.get(this.address + "/api/getItems")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }  

  getAccountingCategories(): Promise<any[]> {
    return this.http.get(this.address + "/api/getAccountingCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getAnaliticCategories(): Promise<any[]> {
    return this.http.get(this.address + "/api/getAnaliticCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getFamilyCategories(): Promise<any[]> {
    return this.http.get(this.address + "/api/getFamilyCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getHomogeneousCategories(): Promise<any[]> {
    return this.http.get(this.address + "/api/getHomogeneousCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getMerceologicalCategories(): Promise<any[]> {
    return this.http.get(this.address + "/api/getMerceologicalCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
