import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';
import { TipoUsuario } from './tipoUsuario';

declare var $: any;

@Component({
  selector: 'usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styles: [`
  .btn-default.btn-on.active {
    background-color: #1a242f;
    border-color: #1a242f;
  }
  label.btn > input[type='radio']{
    display: none;
  }
  `],
  providers: [UsuarioService, AlertComponent]
})
export class UsuarioNuevoComponent implements OnInit {

  form: FormGroup;
  tipoUsuarios: TipoUsuario[];
  listaId;
  flag = 1;
  //lista: Usuario[];

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: UsuarioService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {
    
    this.servicio.getTipoUsuarios()
    .subscribe(
      rs => this.tipoUsuarios = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.tipoUsuarios)
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
    /*


    let id = this.route.snapshot.params['id'];
    
    this.servicio.getUsuarios()
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
    )

    if (!id) return;

    this.servicio.getUsuario(id)
    .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => {
        if (this.guardarUsuario.length > 0) {
          this.form.patchValue({
            id: this.lista[0].id,
            correo: this.lista[0].correo,
            contrasena: this.lista[0].contrasena,
            nombre: this.lista[0].nombre,
            apellido: this.lista[0].apellido,
            direccion: this.lista[0].direccion,
            telefono: this.lista[0].telefono,
            TipoUsuario_id: this.lista[0].TipoUsuario_id,
            estado: this.lista[0].estado,
          })
        }
      } 
    )

    console.log(id);*/
    document.getElementById("nuevo").className += " active";
    document.getElementById("vista").className = document.getElementById("vista").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("eliminar").className = document.getElementById("eliminar").className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

  crearControles() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: '',
      telefono: '',
      TipoUsuario_id: ['', Validators.required],
      estado: ['1', Validators.required],
    })
  }

  guardarUsuario() {
    this.servicio.addUsuario(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', this.form.value.id);
        let link = ['/admin/usuarios/usuario-vista'];
        this.router.navigate(link);
      },
      () => {
        this.alert.setAlert('warning', '<span class="fa fa-check fa-fw"></span> Nuevo usuario creado satisfactoriamente.', this.form.value.id);
        let link = ['/admin/usuarios/usuario-vista'];
        this.router.navigate(link);
      }
    )
  }

  regresar(){
    let link = ['/admin/usuarios/usuario-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    console.log(a);
    console.log(b);
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

}
