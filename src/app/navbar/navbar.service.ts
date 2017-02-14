import { Injectable } from '@angular/core';
import { Categoria } from '../categoria/categoria';
import { Inicio } from '../inicio/inicio';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class NavbarService {

  private headers = new Headers({'content-Type': 'application/json'});
  private url = 'http://localhost:8000/Categoria';
  public collection$: any;
  private _collectionObserver: any;
  private _collection: Array<string>;

  constructor(private http: Http) {

    this._collection = new Array<string>();

    if (window.sessionStorage.getItem('CartItems'))
    this._collection = JSON.parse(window.sessionStorage.getItem('CartItems'));
    
    this.collection$ = new Observable(observer => {
      this._collectionObserver = observer;
    }).share();   
   }

   add(value) {
    this._collection.push(value);
    this._collectionObserver.next(this._collection);
  }

  load() {
    this._collectionObserver.next(this._collection);
  }

  getInicio(id: number):Observable<Inicio[]> { 
    let url = `http://localhost:8000/inicio/${id}`;
    return this.http.get(url)
    .first()
    .map(r => r.json())
    .catch(this.handleError);
  }

  getCategorias():Observable<Categoria[]> { 
    let url = `${this.url}`;
    return this.http.get(url)
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
