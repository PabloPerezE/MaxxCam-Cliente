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
      this.cargarCarrucel();
      this.cargarCartas(); }
    )

  }

  cargarCarrucel() {
    for (let i=0;i<3;i++){
      this.carrusel.push(this.lista[Math.floor((Math.random() * this.lista.length))])
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



