import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { Producto } from './producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styles: [],
  providers: [ProductoService],

})

export class ProductoComponent implements OnInit {

  lista: Producto[];

  constructor(
    private router: Router,
    private servicio: ProductoService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-productos").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-usuarios").className = document.getElementById("menu-usuarios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-tipos").className = document.getElementById("menu-tipos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-categorias").className = document.getElementById("menu-categorias").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetas").className = document.getElementById("menu-etiquetas").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetasProducto").className = document.getElementById("menu-etiquetasProducto").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-imagenes").className = document.getElementById("menu-imagenes").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-orden").className = document.getElementById("menu-orden").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getProductos()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: Producto){
  }

  vista() {
    let link = ['/admin/productos/producto-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/productos/producto-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/productos/producto-nuevo'];
    this.router.navigate(link);
  }

  editar(item: Producto){
    let link = ['/admin/productos', item.id];
    this.router.navigate(link);
  }

  borrar(item: Producto){
    if (!item) return;
    this.servicio.eraseProducto(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}

