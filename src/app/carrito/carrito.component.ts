import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  cart

  constructor() { }

  ngOnInit() {
    this.cart = JSON.parse(window.sessionStorage.getItem('CartItems'));
    let cuenta = [];

    for(let i = 0; i<this.cart.lenght; i++) {
      if (this.cart[i].id)
      break;
    }
  }

}
