import { Component, OnInit } from '@angular/core';
import { ImagenService } from './imagen.service';
import { Imagen } from './imagen';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'imagen',
  templateUrl: './imagen.component.html',
  styles: [],
  providers: [ImagenService],

})

export class ImagenComponent implements OnInit {

  lista: Imagen[];

  constructor(
    private router: Router,
    private servicio: ImagenService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-imagenes").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-usuarios").className = document.getElementById("menu-usuarios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-tipos").className = document.getElementById("menu-tipos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-categorias").className = document.getElementById("menu-categorias").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetas").className = document.getElementById("menu-etiquetas").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetasProducto").className = document.getElementById("menu-etiquetasProducto").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-productos").className = document.getElementById("menu-productos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-orden").className = document.getElementById("menu-orden").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getImagenes()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: Imagen){
  }

  vista() {
    let link = ['/admin/imagenes/imagen-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/imagenes/imagen-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/imagenes/imagen-nuevo'];
    this.router.navigate(link);
  }

  editar(item: Imagen){
    let link = ['/admin/imagenes', item.id];
    this.router.navigate(link);
  }

  borrar(item: Imagen){
    if (!item) return;
    this.servicio.eraseImagen(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}

