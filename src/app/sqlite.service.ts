import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams} from '@angular/http';
import { AppConfigurations } from './app-config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SqliteService {
  private address: string = AppConfigurations.SERVER_ADDRESS;
  constructor(private http: Http) { }

  getResource(resourceName: string): Promise<any[]> {
    var fullResourceServiceName: string = this.getResourceWebServiceName('get');
    var params: URLSearchParams = new URLSearchParams();
    params.set("resourceName", resourceName);
    return this.http.get(fullResourceServiceName, {
      search: params
    })
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }  

  setResource(resourceName: string, resource: any): Promise<boolean>{
    var fullResourceServiceName: string = this.getResourceWebServiceName('set');
    const body = {value: resource, resourceName:resourceName}; 
    return this.http.post(fullResourceServiceName, body)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private getResourceWebServiceName(requestType: string): string{
    return this.address + '/api/' + requestType + 'Resource';
  }

  private capitalizeFirst(name: string): string{
    return name.charAt(0).toUpperCase() + name.substr(1);
  }
}
