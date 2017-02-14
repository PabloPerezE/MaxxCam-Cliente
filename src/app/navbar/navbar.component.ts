import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from './navbar.service';
import { Categoria } from '../categoria/categoria';
import { Subscription} from 'rxjs/Rx';
import { CartComponent } from './cart.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  providers: [AuthService,NavbarService,CartComponent]
})
export class NavbarComponent implements OnInit {

  loginform: FormGroup;
  subscription: Subscription;
  lista: Categoria[];
  logo = [{foto: ""}];

  constructor(
    private router: Router,
    private servicio: AuthService,
    private categoria: NavbarService,
    private fb: FormBuilder,
    private route: ActivatedRoute
    
  ) { 
    this.crearControles();
  }

  ngOnInit() {

    this.categoria.getCategorias()
    .subscribe(
      rs => this.lista = rs,
      er => {},
      () => console.log(this.lista)
    )

    this.categoria.getInicio(1)
    .subscribe(
      rs => this.logo = rs,
      er => {},
      () => console.log(this.logo)
    )
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

    cat(categoria?) {
      if (categoria){
        let link = ['/catalogo', encodeURI(categoria)];
        this.router.navigate(link);
      } else {
        let link = ['/catalogo'];
        this.router.navigate(link);
      }
  }
    
}
