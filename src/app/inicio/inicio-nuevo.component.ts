import { Component, OnInit } from '@angular/core';
import { InicioService } from './inicio.service';
import { Inicio } from './inicio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../admin/alert.component';

declare var $: any;

@Component({
  selector: 'inicio-nuevo',
  templateUrl: './inicio-nuevo.component.html',
  styles: [`
  .btn-default.btn-on.active {
    background-color: #1a242f;
    border-color: #1a242f;
  }
  label.btn > input[type='radio']{
    display: none;
  }
  `],
  providers: [InicioService, AlertComponent]
})
export class InicioNuevoComponent implements OnInit {

  form: FormGroup;
  listaId;
  flag = 1;

  constructor(
    private alert: AlertComponent,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: InicioService,
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
      foto: ['', Validators.required],
      estado: ['1', Validators.required],
    })
  }

  guardarInicio() {

    console.log(this.form.value);
    this.servicio.addInicio(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> Error: No se pudo accesar a la base de datos.', this.form.value.id);
        let link = ['/admin/inicios/inicio-vista'];
        this.router.navigate(link);
      },
      () => {
        console.log(this.form.value);
        this.alert.setAlert('success', '<span class="fa fa-check fa-fw"></span> Nueva imagen creada satisfactoriamente.', this.form.value.id);
        let link = ['/admin/inicios/inicio-vista'];
        this.router.navigate(link);
      }
    )
  }

  regresar(){
    let link = ['/admin/inicios/inicio-vista'];
    this.router.navigate(link);
  }

  onChange(event) {
    var reader  = new FileReader();

    if (event)
    reader.readAsDataURL(event.target.result);

    //console.log(reader);
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

toggle(a,b) {
    document.getElementById(a).className += " active";
    document.getElementById(b).className = document.getElementById(b).className.replace( /(?:^|\s)active(?!\S)/g , '' );
  }

}
