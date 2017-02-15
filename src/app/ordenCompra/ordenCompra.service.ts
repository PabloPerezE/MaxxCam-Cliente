import { Injectable, Directive, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Usuario } from '../usuario/usuario';

import { Observable } from 'rxjs/Observable';
import { OrdenCompra } from './ordenCompra';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

declare var $: any;

@Injectable()

export class OrdenCompraService {

  //@Output() alert: EventEmitter<any> = new EventEmitter();

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8000/ordenCompra';

  private idAlerta = '1';
  private tipoAlerta = 'success';
  private mensajeAlerta = 'Mensaje de alerta';

  constructor(private http: Http) { 
    //this.alert.emit({value: 'Mensaje de alerta'});
  }

  getOrdenCompras():Observable<OrdenCompra[]> { 
    let url = `${this.url}`;
    return this.http.get(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  getOrdenCompra(id: number):Observable<OrdenCompra[]> { 
    let url = `${this.url}/${id}`;
    return this.http.get(url)
    .first()
    .map(r => r.json())
    .catch(this.handleError);
  }

  getPapeleraOrdenCompra():Observable<OrdenCompra[]> { 
    let url = `${this.url}/papelera/`;
    return this.http.get(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  addOrdenCompra(ordenCompra: OrdenCompra){
    let url = `${this.url}`;
    let iJson = JSON.stringify(ordenCompra);
    return this.http.post(url, iJson, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  putOrdenCompra(ordenCompra: OrdenCompra){
    let url = `${this.url}`;
    let iJson = JSON.stringify(ordenCompra);
    return this.http.put(url, iJson, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  delOrdenCompra(id: number){
    let url = `${this.url}/${id}`;
    return this.http.delete(url)
    .map(r => r.json())
    .catch(this.handleError);
  }

  eraseOrdenCompra(id: number){
    let url = `${this.url}/${id}`;
    return this.http.put(url, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  restOrdenCompra(id: number){
    let url = `${this.url}/papelera/${id}`;
    return this.http.put(url, {headers: this.headers})
    .map(r => r.json())
    .catch(this.handleError);
  }

  getUsuarios():Observable<Usuario[]> { 
    let url = 'http://localhost:8000/usuario';
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
