import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'categoria-eliminar',
  templateUrl: './categoria-eliminar.component.html',
  styles: [],
  providers: [CategoriaService, AlertComponent]
})
export class CategoriaEliminarComponent implements OnInit {

  lista: Categoria[];

  constructor(
    private alert: AlertComponent,
    private router: Router,
    private servicio: CategoriaService,
  ) { }

  ngOnInit() {

    document.getElementById("eliminar").className += " active";
    document.getElementById("vista").className = document.getElementById("vista").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("nuevo").className = document.getElementById("nuevo").className.replace( /(?:^|\s)active(?!\S)/g , '' );

    this.servicio.getPapeleraCategoria()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', '9erere3');},
      () => console.log(this.lista)
    )
  }

  recuperarCategoria(item: Categoria){
    if (!item) return;
    this.servicio.restCategoria(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Categoria recuperada', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  eliminar(item: Categoria){
    if (!item) return;
    this.servicio.delCategoria(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Categoria eliminada',item.id );
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
