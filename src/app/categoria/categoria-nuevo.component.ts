import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'categoria-nuevo',
  templateUrl: './categoria-nuevo.component.html',
  styles: [`
  .btn-default.btn-on.active {
    background-color: #1a242f;
    border-color: #1a242f;
  }
  label.btn > input[type='radio']{
    display: none;
  }
  `],
  providers: [CategoriaService, AlertComponent]
})
export class CategoriaNuevoComponent implements OnInit {

  form: FormGroup;
  listaId;
  flag = 1;

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: CategoriaService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {

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
      categoria: ['', Validators.required],
      estado: ['1', Validators.required],
    })

    console.log(this.form.value)
  }

  guardarCategoria() {
    console.log(this.form.value);
    this.servicio.addCategoria(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', this.form.value.id);
        let link = ['/admin/categorias/categoria-vista'];
        this.router.navigate(link);
      },
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Nueva categoria creada satisfactoriamente.', this.form.value.id);
        let link = ['/admin/categorias/categoria-vista'];
        this.router.navigate(link);
      }
    )
  }

  regresar(){
    let link = ['/admin/categorias/categoria-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

}
