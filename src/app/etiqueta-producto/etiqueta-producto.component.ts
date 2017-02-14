import { Component, OnInit } from '@angular/core';
import { EtiquetaProductoService } from './etiqueta-producto.service';
import { EtiquetaProducto } from './etiqueta-producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'etiqueta-producto',
  templateUrl: './etiqueta-producto.component.html',
  styles: [],
  providers: [EtiquetaProductoService],

})

export class EtiquetaProductoComponent implements OnInit {

  lista: EtiquetaProducto[];

  constructor(
    private router: Router,
    private servicio: EtiquetaProductoService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-etiquetasProducto").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-usuarios").className = document.getElementById("menu-usuarios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-tipos").className = document.getElementById("menu-tipos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-categorias").className = document.getElementById("menu-categorias").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-productos").className = document.getElementById("menu-productos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetas").className = document.getElementById("menu-etiquetas").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-imagenes").className = document.getElementById("menu-imagenes").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-inicios").className = document.getElementById("menu-inicios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-orden").className = document.getElementById("menu-orden").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getEtiquetasProducto()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: EtiquetaProducto){
  }

  vista() {
    let link = ['/admin/etiquetas-producto/etiqueta-producto-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/etiquetas-producto/etiqueta-producto-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/etiquetas-producto/etiqueta-producto-nuevo'];
    this.router.navigate(link);
  }

  editar(item: EtiquetaProducto){
    let link = ['/admin/etiquetas-producto', item.id];
    this.router.navigate(link);
  }

  borrar(item: EtiquetaProducto){
    if (!item) return;
    this.servicio.eraseEtiquetaProducto(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}