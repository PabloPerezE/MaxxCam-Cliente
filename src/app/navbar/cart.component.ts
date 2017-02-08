import { Component, OnInit, NgZone } from '@angular/core';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

 /* carritoLleno = false;
  cartItems2: Array<string> = new Array<string>();*/
  cartItems = new Subject<Array<String>>();
  cart;

  constructor(
    private zone:NgZone,
   // private catalogo: CatalogoComponent
  ) { }

  ngOnInit() {
/*
    this.cartItems.subscribe(
      data => {this.cart = data; console.log(this.cart)}
    );
*/
    /*this._myService.collection$.subscribe(latestCollection => {
      this.cartItems2 = latestCollection;
    });

    if (!window.sessionStorage.getItem('CartItems')){
    this.carritoLleno = false;}
 
    else{
      this.cartItems = JSON.parse(window.sessionStorage.getItem('CartItems'));
    }*/
   // this.cartItems.next(JSON.parse(window.sessionStorage.getItem('CartItems')))
   this.updateCart();
  }
  updateCart() {
    setInterval(() => {
      this.cart = JSON.parse(window.sessionStorage.getItem('CartItems'));
    },1000);
    console.log(this.cart);
    //this.cart = this.cart.slice();
  }

  addCart(){
    this.cartItems.next(JSON.parse('dasdas'));
    this.updateCart();
  }

}
