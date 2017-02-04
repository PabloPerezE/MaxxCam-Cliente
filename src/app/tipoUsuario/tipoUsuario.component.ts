import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from './tipoUsuario.service';
import { TipoUsuario } from './tipoUsuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'tipoUsuario',
  templateUrl: './tipoUsuario.component.html',
  styles: [],
  providers: [TipoUsuarioService],

})

export class TipoUsuarioComponent implements OnInit {

  lista: TipoUsuario[];

  constructor(
    private router: Router,
    private servicio: TipoUsuarioService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-tipos").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-usuarios").className = document.getElementById("menu-usuarios").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-productos").className = document.getElementById("menu-productos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-categorias").className = document.getElementById("menu-categorias").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetas").className = document.getElementById("menu-etiquetas").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-imagenes").className = document.getElementById("menu-imagenes").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-orden").className = document.getElementById("menu-orden").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getTipoUsuarios()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: TipoUsuario){
  }

  vista() {
    let link = ['/admin/tipoUsuarios/tipoUsuario-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/tipoUsuarios/tipoUsuario-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/tipoUsuarios/tipoUsuario-nuevo'];
    this.router.navigate(link);
  }

  editar(item: TipoUsuario){
    let link = ['/admin/tipoUsuario', item.id];
    this.router.navigate(link);
  }

  borrar(item: TipoUsuario){
    if (!item) return;
    this.servicio.eraseTipoUsuario(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}

