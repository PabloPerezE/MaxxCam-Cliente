import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from './ordenCompra.service';
import { OrdenCompra } from './ordenCompra';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'ordenCompra',
  templateUrl: './ordenCompra.component.html',
  styles: [],
  providers: [OrdenCompraService],

})

export class OrdenCompraComponent implements OnInit {

  lista: OrdenCompra[];

  constructor(
    private router: Router,
    private servicio: OrdenCompraService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-orden").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-usuarios").className = document.getElementById("menu-usuarios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-tipos").className = document.getElementById("menu-tipos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-categorias").className = document.getElementById("menu-categorias").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetas").className = document.getElementById("menu-etiquetas").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-imagenes").className = document.getElementById("menu-imagenes").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-inicios").className = document.getElementById("menu-inicios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetasProducto").className = document.getElementById("menu-etiquetasProducto").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-productos").className = document.getElementById("menu-productos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getOrdenCompras()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: OrdenCompra){
  }

  vista() {
    let link = ['/admin/ordenesCompra/ordenCompra-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/ordenesCompra/ordenCompra-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/ordenesCompra/ordenCompra-nuevo'];
    this.router.navigate(link);
  }

  editar(item: OrdenCompra){
    let link = ['/admin/ordenesCompra', item.id];
    this.router.navigate(link);
  }

  borrar(item: OrdenCompra){
    if (!item) return;
    this.servicio.eraseOrdenCompra(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}

