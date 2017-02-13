import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';
import { Imagen } from '../imagen/imagen';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class InfoprodService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8000/';

  constructor(private http: Http) { }

  getProducto(id: number):Observable<Producto[]> { 
    let url = `${this.url}producto/${id}`;
    return this.http.get(url)
    .first()
    .map(r => r.json())
    .catch(this.handleError);
  }

  getImagenes(id: number):Observable<Imagen[]> { 
    let url = `${this.url}infoprod/${id}`;
    return this.http.get(url)
    .first()
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
