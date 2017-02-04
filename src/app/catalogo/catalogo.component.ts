import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent} from '../admin/alert.component';
import { CatalogoService } from './catalogo.service';
import { Subscription} from 'rxjs/Rx';
import { Producto } from './producto';
import { NavbarService } from '../navbar/navbar.service';
import { Observable } from 'rxjs/Observable';
import { CartComponent } from '../navbar/cart.component';

@Component({
  selector: 'catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [CatalogoService, AlertComponent, NavbarService,CartComponent]
})
export class CatalogoComponent implements OnInit, OnDestroy {

  lista: any;
  subscription: Subscription;
  param: string;
  categorias;

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: CatalogoService,
    private _myService: NavbarService,
    private cartC: CartComponent
  ) { 
    this.subscription = route.params.subscribe(
      (params: any) => {this.param = params['categoria'];
      console.log(this.param);
      if (!this.param) this.param = 'any';

      this.servicio.getProductos(this.param)
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> No disponible por el momento.','ewwefwewer');},
      () => console.log(this.lista)
    )
    }
    )
  }

  ngOnInit() {

    //this._myService.collection$.subscribe(latestCollection => {})

    this.servicio.getCategorias()
    .subscribe(
      rs => this.categorias = rs,
      er => {},
      () => console.log(this.categorias)
    )

  }

  ngOnDestroy(){

    this.subscription.unsubscribe();

  }

  cat1(categoria?) {
      if (categoria){
        let link = ['/catalogo', encodeURI(categoria)];
        this.router.navigate(link);
      } else {
        let link = ['/catalogo'];
        this.router.navigate(link);
      }
  }
  /*
addCart(item) {
this._myService.add(item);}*/

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
    this.cartC.updateCart();
}

  /*addCart(item) {
    let cart = [];
    let local;
    if (window.sessionStorage.getItem('CartItems')){
      local = window.sessionStorage.getItem('CartItems');
      local = local.Substring(0, local.Length - 1);
      console.log(local);
      cart.push(JSON.parse(local));
    }
    cart.push(item);
    window.sessionStorage.setItem('CartItems', JSON.stringify(cart));
}*/

}
