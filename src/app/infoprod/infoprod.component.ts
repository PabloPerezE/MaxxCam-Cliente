import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoprodService } from './infoprod.service';

@Component({
  selector: 'infoprod',
  templateUrl: './infoprod.component.html',
  styleUrls: ['./infoprod.component.css'],
  providers: [InfoprodService]
})
export class InfoprodComponent implements OnInit {

  producto = [{}];
  imagenes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicio: InfoprodService,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    if (!id) return;

    this.servicio.getProducto(id)
    .subscribe(
      rs => this.producto = rs,
      er => console.log(er),
      () => console.log(this.producto)
    )

    this.servicio.getImagenes(id)
    .subscribe(
      rs => this.imagenes = rs,
      er => console.log(er),
      () => console.log(this.imagenes)
    )
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

carrito(){
  let link = ['/carrito'];
    this.router.navigate(link);
}

}
