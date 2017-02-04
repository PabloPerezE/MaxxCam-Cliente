import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { Producto } from './producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';
import { Categoria } from './categoria';

declare var $: any;

@Component({
  selector: 'producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styles: [`
  .btn-default.btn-on.active {
    background-color: #1a242f;
    border-color: #1a242f;
  }
  label.btn > input[type='radio']{
    display: none;
  }
  `],
  providers: [ProductoService, AlertComponent]
})
export class ProductoNuevoComponent implements OnInit {

  form: FormGroup;
  categorias: Categoria[];
  listaId;
  flag = 1;

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: ProductoService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {

    this.servicio.getCategorias()
    .subscribe(
      rs => this.categorias = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.categorias)
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
      descripcion: ['', Validators.required],
      detalle: ['', Validators.required],
      precio: ['', Validators.required],
      Categoria_id: ['', Validators.required],
      estado: ['1', Validators.required],
    })
  }

  guardarProducto() {
    console.log(this.form.value);
    this.servicio.addProducto(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', this.form.value.id);
        let link = ['/admin/productos/producto-vista'];
        this.router.navigate(link);
      },
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Nuevo producto creado satisfactoriamente.', this.form.value.id);
        let link = ['/admin/productos/producto-vista'];
        this.router.navigate(link);
      }
    )
  }

  regresar(){
    let link = ['/admin/productos/producto-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

}
