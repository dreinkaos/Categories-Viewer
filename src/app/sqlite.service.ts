import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SqliteService {
  private address: string = "http://localhost:3000";
  constructor(private http: Http) { }

  getBasicResource(resourceName: string): Promise<any[]> {
    var fullResourceName: string = this.getResourceWebServiceName(resourceName, 'get');
    return this.http.get(fullResourceName)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }  

  setBasicResource(resourceName: string, resource: any): Promise<boolean>{
    var fullResourceName: string = this.getResourceWebServiceName(resourceName, 'set');
    const body = {value: resource};    
    return this.http.post(fullResourceName, body)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private getResourceWebServiceName(resourceName: string, requestType: string): string{
    return this.address + '/' + requestType + "New" + this.capitalizeFirst(resourceName);
  }

  private capitalizeFirst(name: string): string{
    return name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
  }
}
