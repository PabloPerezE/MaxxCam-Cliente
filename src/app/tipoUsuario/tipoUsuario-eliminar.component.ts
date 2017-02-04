import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from './tipoUsuario.service';
import { TipoUsuario } from './tipoUsuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'tipoUsuario-eliminar',
  templateUrl: './tipoUsuario-eliminar.component.html',
  styles: [],
  providers: [TipoUsuarioService, AlertComponent]
})
export class TipoUsuarioEliminarComponent implements OnInit {

  lista: TipoUsuario[];

  constructor(
    private alert: AlertComponent,
    private router: Router,
    private servicio: TipoUsuarioService,
  ) { }

  ngOnInit() {

    document.getElementById("eliminar").className += " active";
    document.getElementById("vista").className = document.getElementById("vista").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("nuevo").className = document.getElementById("nuevo").className.replace( /(?:^|\s)active(?!\S)/g , '' );

    this.servicio.getPapeleraTipoUsuario()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', '9erere3');},
      () => console.log(this.lista)
    )
  }

  recuperarTipoUsuario(item: TipoUsuario){
    if (!item) return;
    this.servicio.restTipoUsuario(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Tipo de usuario recuperado', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  eliminar(item: TipoUsuario){
    if (!item) return;
    this.servicio.delTipoUsuario(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Tipo de usuario eliminado',item.id );
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
