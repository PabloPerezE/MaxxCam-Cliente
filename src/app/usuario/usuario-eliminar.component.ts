import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'usuario-eliminar',
  templateUrl: './usuario-eliminar.component.html',
  styles: [],
  providers: [UsuarioService, AlertComponent]
})
export class UsuarioEliminarComponent implements OnInit {

  lista: Usuario[];

  constructor(
    private alert: AlertComponent,
    private router: Router,
    private servicio: UsuarioService,
  ) { }

  ngOnInit() {

    document.getElementById("eliminar").className += " active";
    document.getElementById("vista").className = document.getElementById("vista").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("nuevo").className = document.getElementById("nuevo").className.replace( /(?:^|\s)active(?!\S)/g , '' );

    this.servicio.getPapeleraUsuario()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', '9erere3');},
      () => console.log(this.lista)
    )
  }

  recuperarUsuario(item: Usuario){
    if (!item) return;
    this.servicio.restUsuario(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('warning', '<span class="fa fa-check fa-fw"></span> Usuario recuperado', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  eliminar(item: Usuario){
    if (!item) return;
    this.servicio.delUsuario(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('warning', '<span class="fa fa-check fa-fw"></span> Usuario eliminado',item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  shouldDoIt = true; // initialize it to true for the first run

  callFunction(stuff) {
    if (this.shouldDoIt) {
      $(document).ready(function() {
        $('#tabla').DataTable();
      } );
      this.shouldDoIt = false; // set it to false until you need to trigger again
    }
  }

}
