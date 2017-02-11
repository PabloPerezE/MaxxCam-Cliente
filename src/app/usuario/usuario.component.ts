import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styles: [],
  providers: [UsuarioService],

})

export class UsuarioComponent implements OnInit {

  lista: Usuario[];

  constructor(
    private router: Router,
    private servicio: UsuarioService,
  ) {  }

  ngOnInit() {


    document.getElementById("menu-usuarios").className += " active";
    document.getElementById("menu-inicio").className = document.getElementById("menu-inicio").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-tipos").className = document.getElementById("menu-tipos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-productos").className = document.getElementById("menu-productos").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-categorias").className = document.getElementById("menu-categorias").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetas").className = document.getElementById("menu-etiquetas").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-imagenes").className = document.getElementById("menu-imagenes").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-etiquetasProducto").className = document.getElementById("menu-etiquetasProducto").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu-orden").className = document.getElementById("menu-orden").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    
    this.servicio.getUsuarios()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    //this.servicio.alert();
    

  }

  ver(item: Usuario){
  }

  vista() {
    let link = ['/admin/usuarios/usuario-vista'];
    this.router.navigate(link);
  }

  papelera() {
    let link = ['/admin/usuarios/usuario-papelera'];
    this.router.navigate(link);
  }

  nuevo() {
    let link = ['/admin/usuarios/usuario-nuevo'];
    this.router.navigate(link);
  }

  editar(item: Usuario){
    let link = ['/admin/usuario', item.id];
    this.router.navigate(link);
  }

  borrar(item: Usuario){
    if (!item) return;
    this.servicio.eraseUsuario(item.id)
    .subscribe(
      rs => console.log(rs),
      er => console.log(er),
      () => {
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }
  

}

