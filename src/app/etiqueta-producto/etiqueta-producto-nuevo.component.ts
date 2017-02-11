import { Component, OnInit } from '@angular/core';
import { EtiquetaProductoService } from './etiqueta-producto.service';
import { EtiquetaProducto } from './etiqueta-producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';
import { Etiqueta } from '../etiqueta/etiqueta';
import { Producto } from '../producto/producto';

declare var $: any;

@Component({
  selector: 'etiqueta-producto-nuevo',
  templateUrl: './etiqueta-producto-nuevo.component.html',
  styles: [`
  .btn-default.btn-on.active {
    background-color: #1a242f;
    border-color: #1a242f;
  }
  label.btn > input[type='radio']{
    display: none;
  }
  `],
  providers: [EtiquetaProductoService, AlertComponent]
})
export class EtiquetaProductoNuevoComponent implements OnInit {

  form: FormGroup;
  formProducto: FormGroup;
  listaId;
  etiquetas: Etiqueta[];
  productos: Producto[];
  flag = 1;

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: EtiquetaProductoService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {

    this.servicio.getEtiquetas()
    .subscribe(
      rs => this.etiquetas = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.etiquetas)
    )

    this.servicio.getProductos()
    .subscribe(
      rs => this.productos = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.productos)
    )

    this.servicio.getListaId()
    .subscribe(
      rs => this.listaId = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => { console.log(this.listaId);
        if (this.listaId.length > 0) {
          while(this.flag <= this.listaId.length){
            if (this.flag != this.listaId[this.flag-1].id) 
            break;
            this.flag++;
          }
          this.form.patchValue({
        id: this.flag})}
        else {
          this.flag = 1;
          this.form.patchValue({id:this.flag});
        }
      }
    )

    document.getElementById("nuevo").className += " active";
    document.getElementById("vista").className = document.getElementById("vista").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("eliminar").className = document.getElementById("eliminar").className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

  crearControles() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      Etiqueta_id: ['', Validators.required],
      Producto_id: ['', Validators.required],
      estado: ['1', Validators.required],
    })
  }

  guardarEtiquetaProducto() {
    console.log(this.form.value);
    this.servicio.addEtiquetaProducto(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', this.form.value.id);
        let link = ['/admin/etiquetas-producto/etiqueta-producto-vista'];
        this.router.navigate(link);
      },
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Nueva etiqueta con producto creada satisfactoriamente.', this.form.value.id);
        let link = ['/admin/etiquetas-producto/etiqueta-producto-vista'];
        this.router.navigate(link);
      }
    )
  }

  regresar(){
    let link = ['/admin/etiquetas-producto/etiqueta-producto-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

}