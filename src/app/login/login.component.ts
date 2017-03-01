import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../navbar/navbar.service';
import { Categoria } from '../categoria/categoria';
import { Subscription} from 'rxjs/Rx';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService,NavbarService]
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;

  constructor(
    private router: Router,
    private servicio: AuthService,
    private categoria: NavbarService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { this.crearControles(); }

  ngOnInit() {
  }

  crearControles() {
    this.loginform = this.fb.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
    })
  }

  login() {
    this.servicio.autenticar(this.loginform.value)
    .subscribe(
      rs => {},
      er => console.log(er),
      () => {
        console.log('loginfn');

      }
    );
    }

    logout() {
      window.sessionStorage.removeItem('auth_key');
      window.sessionStorage.removeItem('CartItems');
      this.router.navigate(['/']);
    }

    logged() {
      if (window.sessionStorage.getItem('auth_key'))
        return true;

        return false;
    }

    isAdmin() {
      if (window.sessionStorage.getItem('auth_key')){
            let local = this.parseJwt(window.sessionStorage.getItem('auth_key'));
            if (local.TipoUsuario_id == 1)
            return true;
        }
        return false;
    }

    parseJwt(token){
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-','+').replace('_','/');
        return JSON.parse(window.atob(base64));
    }


  forgot(){
  let link = ['/forgot'];
    this.router.navigate(link);
}

register(){
  let link = ['/register'];
    this.router.navigate(link);
}

}
