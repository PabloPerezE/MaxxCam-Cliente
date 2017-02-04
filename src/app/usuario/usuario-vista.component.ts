import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent} from '../admin/alert.component';
import { TipoUsuario } from './tipoUsuario';

declare var $: any;

@Component({
  selector: 'usuario-vista',
  templateUrl: './usuario-vista.component.html',
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
export class UsuarioVistaComponent implements OnInit {

  //@Output() alert: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  lista: Usuario[];
  seleccion: Usuario[];
  tipoUsuarios: TipoUsuario[];

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: UsuarioService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {

    document.getElementById("vista").className += " active";
    document.getElementById("nuevo").className = document.getElementById("nuevo").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("eliminar").className = document.getElementById("eliminar").className.replace( /(?:^|\s)active(?!\S)/g , '' );

    //this.alert.emit({value: 'Mensaje de alerta'});
    
    this.servicio.getUsuarios()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.lista)
    )

    this.servicio.getTipoUsuarios()
    .subscribe(
      rs => this.tipoUsuarios = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.tipoUsuarios)
    )

    let id = this.route.snapshot.params['id'];

    $('#myModal').on('hidden.bs.modal',function(){
      this.regresar();
    }.bind(this));

    if (!id) return;

    if (!$('#myModal').hasClass('in'))
    $('#myModal').modal('show');

    this.servicio.getUsuario(id)
    .subscribe(
      rs => this.seleccion = rs,
      er => console.log(er),
      () => {
        if (this.seleccion.length > 0) {
          this.form.patchValue({
            id: this.seleccion[0].id,
            correo: this.seleccion[0].correo,
            contrasena: this.seleccion[0].contrasena,
            nombre: this.seleccion[0].nombre,
            apellido: this.seleccion[0].apellido,
            direccion: this.seleccion[0].direccion,
            telefono: this.seleccion[0].telefono,
            descripcion: this.seleccion[0].descripcion,
            TipoUsuario_id: this.seleccion[0].TipoUsuario_id,
            estado: this.seleccion[0].estado,
          })
        }
      } 
    )

    console.log(id);
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

  actualizarUsuario(){
    if (!this.form.value) return;
    this.servicio.putUsuario(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.',this.form.value.id );},
      () => {
        this.alert.setAlert('warning', '<span class="fa fa-check fa-fw"></span> Usuario actualizado.', this.form.value.id);
        this.regresar();
      }
    )
  }

  crearControles() {
    this.form = this.fb.group({
      id: ['', Validators.required,],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: '',
      telefono: '',
      TipoUsuario_id: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  editar(item: Usuario){

    let link = ['/admin/usuarios/usuario-vista', item.id];
    this.router.navigate(link);

    $('.modal-backdrop').click(function(e){
      window.location.hash = '#';
      $('.modal-backdrop').remove();
      this.regresar();
    }.bind(this));
  }

  borrar(item: Usuario){
    if (!item) return;
    this.servicio.eraseUsuario(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('warning', '<span class="fa fa-check fa-fw"></span> Usuario borrado', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  regresar() {
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    let link = ['/admin/usuarios/usuario-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }


}
