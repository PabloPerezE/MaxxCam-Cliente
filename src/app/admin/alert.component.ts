import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var $:any;

@Component({
  selector: 'alert',
  templateUrl: `
    <div id="alert" alert ></div>
  `,
  styleUrls: []
})
export class AlertComponent implements OnInit {

    private idAlerta = '1';
    private tipoAlerta = 'success';
    private mensajeAlerta = 'Mensaje de alerta';

    public alerta: EventEmitter<any> =  new EventEmitter;

  constructor() { }

  ngOnInit() { }

  mostrarAlerta(){
    $('#alert').prepend("<div id='" + this.idAlerta +"' class='alert alert-" + this.tipoAlerta + "'>" + this.mensajeAlerta + "</div>");
    $('#' + this.idAlerta).delay(5000).fadeOut( "slow", function() {
      $('#alert').collapse('hide');
      $('#alert').remove('#' + this.idAlerta);
			});
   }

  setAlert(tipo, mensaje, id?){
      if (id)
    this.idAlerta = id;
    this.tipoAlerta = tipo;
    this.mensajeAlerta = mensaje;
    this.mostrarAlerta();

  }

}

