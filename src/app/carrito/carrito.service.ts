import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { OrdenCompra } from '../ordenCompra/ordenCompra';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class CarritoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8000/ordenCompra';

  constructor(private http: Http) { }

  addOrdenCompra(ordenCompra){
    let url = `${this.url}`;
    let iJson = JSON.stringify(ordenCompra);
    return this.http.post(url, iJson, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response) {
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
