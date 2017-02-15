import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarritoService } from './carrito.service';

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  cart;
  total;

  constructor(
    private router: Router,
    private servicio: CarritoService,
  ) { }

  ngOnInit() {

   this.cargar();
   this.calcularTotal();
  }

  cargar() {
    if (window.sessionStorage.getItem('CartItems')){
      this.cart = JSON.parse(window.sessionStorage.getItem('CartItems'));
      console.log(this.cart);
    }
  }

  calcularTotal(){
    this.total = 0;
    for (let i=0;i<this.cart.length;i++){
      this.total += this.cart[i].precio;
    }
  }

  infoprod(id){
  let link = ['/infoprod', id];
    this.router.navigate(link);
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

  remove(index){
    if (window.sessionStorage.getItem('CartItems')){
      let rem = JSON.parse(window.sessionStorage.getItem('CartItems'));
      rem.splice(index-1,1);
      window.sessionStorage.setItem('CartItems', JSON.stringify(rem));
  }
  this.cargar();
  this.calcularTotal();
}

catalogo(){
  let link = ['/catalogo'];
    this.router.navigate(link);
}

generarOrden(){
  if (window.sessionStorage.getItem('auth_key')){
            let local = this.parseJwt(window.sessionStorage.getItem('auth_key'));
            let orden = {
              id: local.id,
            }
            this.guardarOrdenCompra(local);
      
    
  }
}

guardarOrdenCompra(local) {
    this.servicio.addOrdenCompra(local)
    .subscribe(
      rs => console.log(rs),
      er => {},
      () => {}
    )
}
parseJwt(token){
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-','+').replace('_','/');
        return JSON.parse(window.atob(base64));
    }

}
