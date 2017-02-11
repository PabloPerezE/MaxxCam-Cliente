import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'categoria',
  templateUrl: './categoria.component.html',
  styles: [],
  providers: [CategoriaService],

})

export class CategoriaComponent implements OnInit {

  lista: Categoria[];

  constructor(
    private router: Router,
    private servicio: CategoriaService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-categorias").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-usuarios").className = document.getElementById("menu-usuarios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-tipos").className = document.getElementById("menu-tipos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-productos").className = document.getElementById("menu-productos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetas").className = document.getElementById("menu-etiquetas").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-imagenes").className = document.getElementById("menu-imagenes").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetasProducto").className = document.getElementById("menu-etiquetasProducto").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-orden").className = document.getElementById("menu-orden").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getCategorias()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: Categoria){
  }

  vista() {
    let link = ['/admin/categorias/categoria-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/categorias/categoria-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/categorias/categoria-nuevo'];
    this.router.navigate(link);
  }

  editar(item: Categoria){
    let link = ['/admin/categorias', item.id];
    this.router.navigate(link);
  }

  borrar(item: Categoria){
    if (!item) return;
    this.servicio.eraseCategoria(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}

