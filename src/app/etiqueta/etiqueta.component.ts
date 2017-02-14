import { Component, OnInit } from '@angular/core';
import { EtiquetaService } from './etiqueta.service';
import { Etiqueta } from './etiqueta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'etiqueta',
  templateUrl: './etiqueta.component.html',
  styles: [],
  providers: [EtiquetaService],

})

export class EtiquetaComponent implements OnInit {

  lista: Etiqueta[];

  constructor(
    private router: Router,
    private servicio: EtiquetaService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-etiquetas").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-usuarios").className = document.getElementById("menu-usuarios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-tipos").className = document.getElementById("menu-tipos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-categorias").className = document.getElementById("menu-categorias").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-productos").className = document.getElementById("menu-productos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-imagenes").className = document.getElementById("menu-imagenes").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetasProducto").className = document.getElementById("menu-etiquetasProducto").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-inicios").className = document.getElementById("menu-inicios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-orden").className = document.getElementById("menu-orden").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getEtiquetas()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: Etiqueta){
  }

  vista() {
    let link = ['/admin/etiquetas/etiqueta-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/etiquetas/etiqueta-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/etiquetas/etiqueta-nuevo'];
    this.router.navigate(link);
  }

  editar(item: Etiqueta){
    let link = ['/admin/etiquetas', item.id];
    this.router.navigate(link);
  }

  borrar(item: Etiqueta){
    if (!item) return;
    this.servicio.eraseEtiqueta(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}

