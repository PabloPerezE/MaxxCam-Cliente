import { Injectable, Directive, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Producto } from './producto';
import { Categoria } from './categoria';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

declare var $: any;

@Injectable()

export class ProductoService {

  //@Output() alert: EventEmitter<any> = new EventEmitter();

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8000/producto';

  private idAlerta = '1';
  private tipoAlerta = 'success';
  private mensajeAlerta = 'Mensaje de alerta';

  constructor(private http: Http) { 
    //this.alert.emit({value: 'Mensaje de alerta'});
  }

  getProductos():Observable<Producto[]> { 
    let url = `${this.url}`;
    return this.http.get(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  getProducto(id: number):Observable<Producto[]> { 
    let url = `${this.url}/${id}`;
    return this.http.get(url)
    .first()
    .map(r => r.json())
    .catch(this.handleError);
  }

  getPapeleraProducto():Observable<Producto[]> { 
    let url = `${this.url}/papelera/`;
    return this.http.get(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  addProducto(producto: Producto){
    let url = `${this.url}`;
    let iJson = JSON.stringify(producto);
    return this.http.post(url, iJson, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  putProducto(producto: Producto){
    let url = `${this.url}`;
    let iJson = JSON.stringify(producto);
    return this.http.put(url, iJson, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  delProducto(id: number){
    let url = `${this.url}/${id}`;
    return this.http.delete(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  eraseProducto(id: number){
    let url = `${this.url}/${id}`;
    return this.http.put(url, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  restProducto(id: number){
    let url = `${this.url}/papelera/${id}`;
    return this.http.put(url, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  getCategorias():Observable<Categoria[]> { 
    let url = 'http://localhost:8000/categoria';
    return this.http.get(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  getListaId():Observable<any> { 
    let url = 'http://localhost:8000/productoId';
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

  alert = function() {
    $('#alert').prepend("<div id='" + this.idAlerta +"' class='alert alert-" + this.tipoAlerta + "'>" + this.mensajeAlerta + "</div>");
    $('#' + this.idAlerta).delay(5000).fadeOut( "slow", function() {
      $('#alert').collapse('hide');
      $('#alert').remove('#' + this.idAlerta);
			});
}


  setAlert(id, tipo, mensaje){
    this.idAlerta = id;
    this.tipoAlerta = tipo;
    this.mensajeAlerta = mensaje;

  }


}
