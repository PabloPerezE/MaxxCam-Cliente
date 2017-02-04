import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthManager implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
        if (window.sessionStorage.getItem('auth_key'))
        return true;

        console.log('Debes iniciar sesión');
        this.router.navigate(['/']);
        return false;
    }
}