import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from './ordenCompra.service';
import { OrdenCompra } from './ordenCompra';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'ordenCompra-nuevo',
  templateUrl: './ordenCompra-nuevo.component.html',
  styles: [],
  providers: [OrdenCompraService, AlertComponent]
})
export class OrdenCompraNuevoComponent implements OnInit {

  form: FormGroup;

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: OrdenCompraService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {
    document.getElementById("nuevo").className += " active";
    document.getElementById("vista").className = document.getElementById("vista").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("eliminar").className = document.getElementById("eliminar").className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

  crearControles() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      descripcion: ['', Validators.required],
      detalle: ['', Validators.required],
      precio: ['', Validators.required],
      Categoria_id: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  guardarOrdenCompra() {
    this.servicio.addOrdenCompra(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', this.form.value.id);
        let link = ['/admin/ordenesCompra/ordenCompra-vista'];
        this.router.navigate(link);
      },
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Nuevo orden de compra creada satisfactoriamente.', this.form.value.id);
        let link = ['/admin/ordenesCompra/ordenCompra-vista'];
        this.router.navigate(link);
      }
    )
  }

  regresar(){
    let link = ['/admin/ordenesCompra/ordenCompra-vista'];
    this.router.navigate(link);
  }

}
