import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {


  private autenticado: boolean = false;
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8000/auth';

  constructor(private http: Http, private router: Router) { }

  autenticar(usuario) {
    let url = `${this.url}`;
    let iJson = JSON.stringify(usuario);
    return this.http.post(url, iJson, {headers: this.headers})
    .map((data) => {
      if (data.json().success) {
        window.sessionStorage.setItem('auth_key', data.json().token);
        this.autenticado = true;
        this.router.navigate(['/admin/']);
        
      }
    })
  }
  
}


