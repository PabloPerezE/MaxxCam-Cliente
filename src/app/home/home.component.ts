import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo/catalogo.service';
import { AlertComponent} from '../admin/alert.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CatalogoService,AlertComponent]
})
export class HomeComponent implements OnInit {

  param;
  lista;

  constructor(
    private servicio: CatalogoService,
    private alert: AlertComponent,
  ) { }

  ngOnInit() {
    this.servicio.getProductos(this.param)
    .subscribe(
      rs => this.lista = rs,
      er => {this.alert.setAlert('danger', '<span class="fa fa-times fa-fw"></span> No disponible por el momento.','ewwefwewer');},
      () => console.log(this.lista)
    )
  }

}
