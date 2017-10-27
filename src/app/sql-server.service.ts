import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SqlServerService {

  private address: string = "http://192.168.1.184:3000";
  constructor(private http: Http) { }

  getItems(): Promise<any[]> {
    return this.http.get(this.address + "/getItems")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }  

  getAccountingCategories(): Promise<any[]> {
    return this.http.get(this.address + "/getAccountingCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getAnaliticCategories(): Promise<any[]> {
    return this.http.get(this.address + "/getAnaliticCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getFamilyCategories(): Promise<any[]> {
    return this.http.get(this.address + "/getFamilyCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getHomogeneousCategories(): Promise<any[]> {
    return this.http.get(this.address + "/getHomogeneousCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getMerceologicalCategories(): Promise<any[]> {
    return this.http.get(this.address + "/getMerceologicalCategories")
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
