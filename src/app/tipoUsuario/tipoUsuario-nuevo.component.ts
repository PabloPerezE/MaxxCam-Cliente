import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from './tipoUsuario.service';
import { TipoUsuario } from './tipoUsuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'tipoUsuario-nuevo',
  templateUrl: './tipoUsuario-nuevo.component.html',
  styles: [`
  .btn-default.btn-on.active {
    background-color: #1a242f;
    border-color: #1a242f;
  }
  label.btn > input[type='radio']{
    display: none;
  }
  `],
  providers: [TipoUsuarioService, AlertComponent]
})
export class TipoUsuarioNuevoComponent implements OnInit {

  form: FormGroup;
  listaId;
  flag = 1;

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: TipoUsuarioService,
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
      descripcion: ['', Validators.required],
      estado: ['1', Validators.required],
    })
  }

  guardarTipoUsuario() {
    this.servicio.addTipoUsuario(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', this.form.value.id);
        let link = ['/admin/tipoUsuarios/tipoUsuario-vista'];
        this.router.navigate(link);
      },
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Nuevo tipo de usuario creado satisfactoriamente.', this.form.value.id);
        let link = ['/admin/tipoUsuarios/tipoUsuario-vista'];
        this.router.navigate(link);
      }
    )
  }

  regresar(){
    let link = ['/admin/tipoUsuarios/tipoUsuario-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    console.log(a);
    console.log(b);
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

}
