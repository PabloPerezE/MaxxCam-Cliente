import { Injectable, Directive, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Categoria } from './categoria';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

declare var $: any;

@Injectable()

export class CategoriaService {

  //@Output() alert: EventEmitter<any> = new EventEmitter();

  private headers = new Headers({'content-Type': 'application/json'});
  private url = 'http://localhost:8000/Categoria';

  private idAlerta = '1';
  private tipoAlerta = 'success';
  private mensajeAlerta = 'Mensaje de alerta';

  constructor(private http: Http) { 
    //this.alert.emit({value: 'Mensaje de alerta'});
  }

  getCategorias():Observable<Categoria[]> { 
    let url = `${this.url}`;
    return this.http.get(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  getCategoria(id: number):Observable<Categoria[]> { 
    let url = `${this.url}/${id}`;
    return this.http.get(url)
    .first()
    .map(r => r.json())
    .catch(this.handleError);
  }

  getPapeleraCategoria():Observable<Categoria[]> { 
    let url = `${this.url}/papelera/`;
    return this.http.get(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  addCategoria(categoria: Categoria){
    let url = `${this.url}`;
    let iJson = JSON.stringify(categoria);
    return this.http.post(url, iJson, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  putCategoria(categoria: Categoria){
    let url = `${this.url}`;
    let iJson = JSON.stringify(categoria);
    return this.http.put(url, iJson, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  delCategoria(id: number){
    let url = `${this.url}/${id}`;
    return this.http.delete(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  eraseCategoria(id: number){
    let url = `${this.url}/${id}`;
    return this.http.put(url, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  restCategoria(id: number){
    let url = `${this.url}/papelera/${id}`;
    return this.http.put(url, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  getListaId():Observable<any> { 
    let url = `http://localhost:8000/categoriaId`;
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
