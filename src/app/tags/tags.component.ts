import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent} from '../admin/alert.component';
import { TagService } from './tags.service';
import { Subscription} from 'rxjs/Rx';
import { Producto } from './producto';
import { NavbarService } from '../navbar/navbar.service';
import { Observable } from 'rxjs/Observable';
import { CartComponent } from '../navbar/cart.component';

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers: [TagService, AlertComponent, NavbarService,CartComponent]
})
export class TagComponent implements OnInit, OnDestroy {

  lista: any;
  subscription: Subscription;
  param: string;
  etiquetas;
  categorias;

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: TagService,
    private _myService: NavbarService,
    private cartC: CartComponent
  ) { 
    this.subscription = route.params.subscribe(
      (params: any) => {this.param = params['etiqueta'];
      //console.log(this.param);
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

    this.servicio.getEtiquetas()
    .subscribe(
      rs => this.etiquetas = rs,
      er => {},
      () => console.log(this.etiquetas)
    )

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

  tag1(etiqueta?) {
      if (etiqueta){
        let link = ['/tags', encodeURI(etiqueta)];
        this.router.navigate(link);
      } else {
        let link = ['/tags'];
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
}
decode(){
  if(this.param == "any")
  return "";

  return decodeURI(this.param);
}

infoprod(id){
  let link = ['/infoprod', id];
    this.router.navigate(link);
}

tags(){
  let link = ['/tags'];
    this.router.navigate(link);
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
