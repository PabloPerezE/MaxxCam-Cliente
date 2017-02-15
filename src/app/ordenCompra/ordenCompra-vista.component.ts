import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrdenCompraService } from './ordenCompra.service';
import { OrdenCompra } from './ordenCompra';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent} from '../admin/alert.component';
import { Usuario } from '../usuario/usuario';

declare var $: any;

@Component({
  selector: 'ordenCompra-vista',
  templateUrl: './ordenCompra-vista.component.html',
  styles: [`
  .btn-default.btn-on.active {
    background-color: #1a242f;
    border-color: #1a242f;
  }
  label.btn > input[type='radio']{
    display: none;
  }
  `],
  providers: [OrdenCompraService, AlertComponent]
})
export class OrdenCompraVistaComponent implements OnInit {

  //@Output() alert: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  lista: OrdenCompra[];
  seleccion: OrdenCompra[];  
  usuarios = [];

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: OrdenCompraService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {

    document.getElementById("vista").className += " active";
    document.getElementById("eliminar").className = document.getElementById("eliminar").className.replace( /(?:^|\s)active(?!\S)/g , '' );

    //this.alert.emit({value: 'Mensaje de alerta'});
    
    this.servicio.getOrdenCompras()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.lista)
    )

    this.servicio.getUsuarios()
    .subscribe(
      rs => this.usuarios = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => {console.log(this.usuarios)}
    )

    let id = this.route.snapshot.params['id'];

    if (!id) return;

    this.servicio.getOrdenCompra(id)
    .subscribe(
      rs => this.seleccion = rs,
      er => console.log(er),
      () => {
        if (this.seleccion.length > 0) {
          this.form.patchValue({
            id: this.seleccion[0].id,
            fecha: this.seleccion[0].fecha,
            cliente: this.seleccion[0].Usuario_id,
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

  actualizarOrdenCompra(){
    if (!this.form.value) return;
    this.servicio.putOrdenCompra(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.',this.form.value.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Orden de compra actualizada.', this.form.value.id);
        this.regresar();
      }
    )
  }

  crearControles() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      fecha: ['', Validators.required],
      cliente: ['', Validators.required],
      estado: ['1', Validators.required],
    })
  }

  editar(item: OrdenCompra){
    let link = ['/admin/ordenesCompra/ordenCompra-vista', item.id];
    this.router.navigate(link);
  }

  borrar(item: OrdenCompra){
    if (!item) return;
    this.servicio.eraseOrdenCompra(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Orden de compra borrada', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  regresar() {
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    let link = ['/admin/ordenesCompra/ordenCompra-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }


}
