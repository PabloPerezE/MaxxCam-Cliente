import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent} from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'categoria-vista',
  templateUrl: './categoria-vista.component.html',
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
export class CategoriaVistaComponent implements OnInit {

  //@Output() alert: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  lista: Categoria[];
  seleccion: Categoria[];

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: CategoriaService,
    private fb: FormBuilder,
  ) { this.crearControles(); }

  ngOnInit() {

    document.getElementById("vista").className += " active";
    document.getElementById("nuevo").className = document.getElementById("nuevo").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("eliminar").className = document.getElementById("eliminar").className.replace( /(?:^|\s)active(?!\S)/g , '' );

    //this.alert.emit({value: 'Mensaje de alerta'});
    
    this.servicio.getCategorias()
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.','ewwefwewer');},
      () => console.log(this.lista)
    )

    let id = this.route.snapshot.params['id'];

    $('#myModal').on('hidden.bs.modal',function(){
      this.regresar();
    }.bind(this));

    if (!id) return;

    if (!$('#myModal').hasClass('in'))
    $('#myModal').modal('show');

    this.servicio.getCategoria(id)
    .subscribe(
      rs => this.seleccion = rs,
      er => console.log(er),
      () => {
        if (this.seleccion.length > 0) {
          this.form.patchValue({
            id: this.seleccion[0].id,
            categoria: this.seleccion[0].categoria,
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

  actualizarCategoria(){
    if (!this.form.value) return;
    this.servicio.putCategoria(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.',this.form.value.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Categoria actualizada.', this.form.value.id);
        this.regresar();
      }
    )
  }

  crearControles() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  editar(item: Categoria){
    let link = ['/admin/categorias/categoria-vista', item.id];
    this.router.navigate(link);

    $('.modal-backdrop').click(function(e){
      window.location.hash = '#';
      $('.modal-backdrop').remove();
      this.regresar();
    }.bind(this));
  }

  borrar(item: Categoria){
    if (!item) return;
    this.servicio.eraseCategoria(item.id)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', item.id );},
      () => {
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Categoria borrada', item.id );
        this.lista = this.lista.filter(h => h !== item)
      }
    )
  }

  regresar() {
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    let link = ['/admin/categorias/categoria-vista'];
    this.router.navigate(link);
  }

  toggle(a,b) {
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }


}
