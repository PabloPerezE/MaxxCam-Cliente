import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsuarioService]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  listaId;
  flag = 1;

  constructor(
    private router: Router,
    private servicio: UsuarioService,
    private fb: FormBuilder,) {this.crearControles(); }

  ngOnInit() {

    this.servicio.getListaId()
    .subscribe(
      rs => this.listaId = rs,
      er => {},
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
          this.form.patchValue({id:this.flag});
        }
      }
    )
  }

  crearControles() {
    this.form = this.fb.group({
      id: [this.flag, Validators.required],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: '',
      telefono: '',
      TipoUsuario_id: ['2', Validators.required],
      estado: ['1', Validators.required],
    })
  }

  guardarUsuario() {
    this.servicio.addUsuario(this.form.value)
    .subscribe(
      rs => console.log(rs),
      er => {let link = ['/'];
        this.router.navigate(link);
      },
      () => {
        let link = ['/'];
        this.router.navigate(link);
      }
    )
  }

}
