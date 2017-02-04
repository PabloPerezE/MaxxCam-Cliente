import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImagenService } from './imagen.service';
import { Imagen } from './imagen';
import { Producto } from '../producto/producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent} from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'imagen-vista',
  templateUrl: './imagen-vista.component.html',
  styles: [`
  .btn-default.btn-on.active {
    background-color: #1a242f;
    border-color: #1a242f;
  }
  label.btn > input[type='radio']{
    display: none;
  }
  `],
  providers: [ImagenService, AlertComponent]
})
export class ImagenVistaComponent implements OnInit {

  //@Output() alert: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  lista: Imagen[];
  seleccion: Imagen[];
  productos: Producto[];

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: ImagenService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {

    document.getElementById("vista").className += " active";
    document.getElementById("nuevo").className = document.getElementById("nuevo").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("eliminar").className = document.getElementById("eliminar").className.replace( /(?:^|\s)active(?!\S)/g , '' );

    //this.alert.emit({value: 'Mensaje de alerta'});
    
    this.servicio.getImagenes()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.lista)
    )

    this.servicio.getProductos()
    .subscribe(
      rs => this.productos = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.productos)
    )

    let id = this.route.snapshot.params['id'];

    $('#myModal').on('hidden.bs.modal',function(){
      this.regresar();
    }.bind(this));

    if (!id) return;

    if (!$('#myModal').hasClass('in'))
    $('#myModal').modal('show');

    this.servicio.getImagen(id)
    .subscribe(
      rs => this.seleccion = rs,
      er => console.log(er),
      () => {
        if (this.seleccion.length > 0) {
          this.form.patchValue({
            id: this.seleccion[0].id,
            nombre: this.seleccion[0].nombre,
            foto: this.seleccion[0].foto,
            descripcion: this.seleccion[0].descripcion,
            Producto_id: this.seleccion[0].Producto_id,
            estado: this.seleccion[0].estado,
          })
          console.log(this.seleccion);
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

  actualizarImagen(){
    if (!this.form.value) return;
    this.servicio.putImagen(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.',this.form.value.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Imagen actualizada.', this.form.value.id);
        this.regresar();
      }
    )
  }

  crearControles() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      foto: ['', Validators.required],
      Producto_id: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  editar(item: Imagen){
    let link = ['/admin/imagenes/imagen-vista', item.id];
    this.router.navigate(link);

    $('.modal-backdrop').click(function(e){
      window.location.hash = '#';
      $('.modal-backdrop').remove();
      this.regresar();
    }.bind(this));
  }

  borrar(item: Imagen){
    if (!item) return;
    this.servicio.eraseImagen(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Imagen borrada', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  previewFile() {
  let file = $('#foto').prop('files')[0];
  var reader  = new FileReader();
  let prev = $('#prev').attr('scr');

  reader.onloadend = function(){
    //console.log(reader.result);
    prev = reader.result;
    this.form.patchValue({ foto: reader.result});
    //console.log(this.form.value);
  }.bind(this);

  if (file) {
    reader.readAsDataURL(file);
  }

  //console.log('terminado');
}

  regresar() {
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    let link = ['/admin/imagenes/imagen-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }


}
