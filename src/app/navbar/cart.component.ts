import { Component, OnInit, NgZone } from '@angular/core';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 /* carritoLleno = false;
  cartItems2: Array<string> = new Array<string>();*/
  cartItems = new Subject<Array<String>>();
  cart;

  constructor(
    private router: Router
   // private catalogo: CatalogoComponent
  ) { }

  ngOnInit() {
   this.updateCart();
  }
  updateCart() {
    setInterval(() => {
      this.cart = JSON.parse(window.sessionStorage.getItem('CartItems'));
    },1000);
    console.log(this.cart);
    //this.cart = this.cart.slice();
  }

  carrito(){
  let link = ['/carrito'];
    this.router.navigate(link);
}

}
