import { Component, OnInit } from '@angular/core';
import { InicioService } from './inicio.service';
import { Inicio } from './inicio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styles: [],
  providers: [InicioService],

})

export class InicioComponent implements OnInit {

  lista: Inicio[];

  constructor(
    private router: Router,
    private servicio: InicioService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-inicios").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-usuarios").className = document.getElementById("menu-usuarios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-tipos").className = document.getElementById("menu-tipos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-categorias").className = document.getElementById("menu-categorias").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetas").className = document.getElementById("menu-etiquetas").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetasProducto").className = document.getElementById("menu-etiquetasProducto").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-productos").className = document.getElementById("menu-productos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-orden").className = document.getElementById("menu-orden").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-imagenes").className = document.getElementById("menu-imagenes").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getInicioes()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: Inicio){
  }

  vista() {
    let link = ['/admin/inicios/inicio-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/inicios/inicio-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/inicios/inicio-nuevo'];
    this.router.navigate(link);
  }

  editar(item: Inicio){
    let link = ['/admin/inicios', item.id];
    this.router.navigate(link);
  }

  borrar(item: Inicio){
    if (!item) return;
    this.servicio.eraseInicio(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}

