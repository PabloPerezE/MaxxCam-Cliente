import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from './ordenCompra.service';
import { OrdenCompra } from './ordenCompra';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'ordenCompra-eliminar',
  templateUrl: './ordenCompra-eliminar.component.html',
  styles: [],
  providers: [OrdenCompraService, AlertComponent]
})
export class OrdenCompraEliminarComponent implements OnInit {

  lista: OrdenCompra[];

  constructor(
    private alert: AlertComponent,
    private router: Router,
    private servicio: OrdenCompraService,
  ) { }

  ngOnInit() {

    document.getElementById("eliminar").className += " active";
    document.getElementById("vista").className = document.getElementById("vista").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    this.servicio.getPapeleraOrdenCompra()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', '9erere3');},
      () => console.log(this.lista)
    )
  }

  recuperarOrdenCompra(item: OrdenCompra){
    if (!item) return;
    this.servicio.restOrdenCompra(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Orden de compra recuperada', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  eliminar(item: OrdenCompra){
    if (!item) return;
    this.servicio.delOrdenCompra(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Orden de compra eliminada',item.id );
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
