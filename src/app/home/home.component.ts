import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { AlertComponent} from '../admin/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService,AlertComponent]
})
export class HomeComponent implements OnInit {

  param = "any";
  lista;
  inicio;
  carrusel = [];
  cartas = [[],[],[],[]];

  constructor(
    private servicio: HomeService,
    private alert: AlertComponent,
    private router: Router
  ) { }

  ngOnInit() {
    this.servicio.getProductos(this.param)
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> No disponible por el momento.','ewwefwewer');},
      () => {console.log(this.lista);
      this.cargarCartas(); }
    )

    this.servicio.getInicioes()
    .subscribe(
      rs => this.inicio = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> No disponible por el momento.','ewwefwewer');},
      () => {console.log(this.inicio);
      this.cargarCarrucel();}
    )

  }

  cargarCarrucel() {
    for (let i=1;i<this.inicio.length;i++){
      this.carrusel.push(this.inicio[i]);
    }
  }

  cargarCartas() {
    for (let i=0;i<4;i++){
      for (let j=0;j<4;j++){
      this.cartas[i].push(this.lista[Math.floor((Math.random() * this.lista.length))])
      }
    }
    console.log(this.cartas)
  }

  infoprod(id){
  let link = ['/infoprod', id];
    this.router.navigate(link);
}

catalogo(){
  let link = ['/catalogo'];
    this.router.navigate(link);
}

addCart(item) {
    if (window.sessionStorage.getItem('CartItems')){
    let anterior = JSON.parse(window.sessionStorage.getItem('CartItems'));
    anterior.push(item);
    window.sessionStorage.setItem('CartItems', JSON.stringify(anterior));
    } else {
    let cart = [];
    cart.push(item);
    window.sessionStorage.setItem('CartItems', JSON.stringify(cart));
    }
}

}



