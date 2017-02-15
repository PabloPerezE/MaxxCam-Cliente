import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthManager implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
        if (window.sessionStorage.getItem('auth_key')){
            let local = this.parseJwt(window.sessionStorage.getItem('auth_key'));
            console.log(local);
            if (local.TipoUsuario_id == 1)
            return true;

            this.router.navigate(['/catalogo']);
            return false;
        }

        console.log('Debes iniciar sesión');
        this.router.navigate(['/']);
        return false;
    }

    parseJwt(token){
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-','+').replace('_','/');
        return JSON.parse(window.atob(base64));
    }

}