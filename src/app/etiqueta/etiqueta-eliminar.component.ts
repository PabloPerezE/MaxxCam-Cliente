import { Component, OnInit } from '@angular/core';
import { EtiquetaService } from './etiqueta.service';
import { Etiqueta } from './etiqueta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'etiqueta-eliminar',
  templateUrl: './etiqueta-eliminar.component.html',
  styles: [],
  providers: [EtiquetaService, AlertComponent]
})
export class EtiquetaEliminarComponent implements OnInit {

  lista: Etiqueta[];

  constructor(
    private alert: AlertComponent,
    private router: Router,
    private servicio: EtiquetaService,
  ) { }

  ngOnInit() {

    document.getElementById("eliminar").className += " active";
    document.getElementById("vista").className = document.getElementById("vista").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("nuevo").className = document.getElementById("nuevo").className.replace( /(?:^|\s)active(?!\S)/g , '' );

    this.servicio.getPapeleraEtiqueta()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', '9erere3');},
      () => console.log(this.lista)
    )
  }

  recuperarEtiqueta(item: Etiqueta){
    if (!item) return;
    this.servicio.restEtiqueta(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Etiqueta recuperada', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  eliminar(item: Etiqueta){
    if (!item) return;
    this.servicio.delEtiqueta(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Etiqueta eliminada',item.id );
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
