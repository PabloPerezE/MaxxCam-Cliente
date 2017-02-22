import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarritoService } from './carrito.service';

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [CarritoService]
})
export class CarritoComponent implements OnInit {
  
  cart;
  total;
  currentdate = new Date();
  flag2;

  constructor(
    private router: Router,
    private servicio: CarritoService,
  ) { }

  ngOnInit() {

   if (window.sessionStorage.getItem('CartItems')) {
   this.cargar();
   this.calcularTotal();
  }
  this.flag2 = 1;
  }

  cargar() {
    if (window.sessionStorage.getItem('CartItems')){
      this.cart = JSON.parse(window.sessionStorage.getItem('CartItems'));
      console.log(this.cart);
    }
  }

  calcularTotal(){
    this.total = 0;
    for (let i=0;i<this.cart.length;i++){
      this.total += this.cart[i].precio;
    }
  }

  infoprod(id){
  let link = ['/infoprod', id];
    this.router.navigate(link);
}

cat1(categoria?) {
      if (categoria){
        let link = ['/catalogo', encodeURI(categoria)];
        this.router.navigate(link);
      } else {
        let link = ['/catalogo'];
        this.router.navigate(link);
      }
  }

  remove(index){
    if (window.sessionStorage.getItem('CartItems')){
      let rem = JSON.parse(window.sessionStorage.getItem('CartItems'));
      rem.splice(index,1);
      window.sessionStorage.setItem('CartItems', JSON.stringify(rem));
  }
  this.cargar();
  this.calcularTotal();
}

catalogo(){
  let link = ['/catalogo'];
    this.router.navigate(link);
}

confirmar() {
  let x;
  if (confirm("¿ Enviar orden de compra ?") == true){
    this.generarOrden();
  }
}

generarOrden(){
  if (window.sessionStorage.getItem('auth_key')){
    if (window.sessionStorage.getItem('CartItems')){
      let listaId;
      let flag = 1;
      this.servicio.getListaId()
      .subscribe(
        rs => listaId = rs,
        er => {},
        () => { console.log(listaId);
          if (listaId.length > 0) {
            while(flag <= listaId.length){
              if (flag != listaId[flag-1].id) 
              break;
              flag++;
              }
            }
          else {
            flag = 1;
          }
          let local = this.parseJwt(window.sessionStorage.getItem('auth_key'));
            let orden = {
              id: flag,
              fecha: this.currentdate.getDate() + "/"
                + (this.currentdate.getMonth()+1)  + "/" 
                + this.currentdate.getFullYear(),
              Usuario_id: local.id,
              estado: 1,
            };

            this.servicio.addOrdenCompra(orden)
            .subscribe(
              rs => console.log(rs),
              er => {},
              () => {

                let listaItemsId;

                this.servicio.getListaItemsId()
                    .subscribe(
                      rs => listaItemsId = rs,
                      er => {},
                      () => { console.log(listaItemsId);
                        if (listaItemsId.length > 0) {
                          while(this.flag2 <= listaItemsId.length){
                            
                            if (this.flag2 != listaItemsId[this.flag2-1].id) 
                            break;
                            this.flag2++;
                            }
                          }
                        else {
                        }
                      }
                    )
                  

                  for (let i=0;i<this.cart.length;i++) {
                    
                    let item = {
                      id: this.flag2,
                      CabeceraOrdenCompra_id: flag,
                      Producto_id: this.cart[i].id,
                      estado: 1
                    }
                    this.guardarItem(item)
                    console.log(item);
                    this.flag2++;
                  }

                  let tabla = [];
                  for (let i=0;i<this.cart.length;i++){
                    tabla.push(this.cart[i]);
                  }

                  let mail = {
                    "para": "pabseb2@gmail.com",
                    "nombre": local.nombre,
                    "apellido": local.apellido,
                    "fecha": this.currentdate.getDate() + "/"
                + (this.currentdate.getMonth()+1)  + "/" 
                + this.currentdate.getFullYear(),
                    "direccion": local.direccion,
                    "telefono": local.telefono,
                    "id": this.flag2,
                    "correo": local.correo,
                    tabla: tabla,
                    "total": this.total
                  };

                  this.servicio.enviarMail(mail)
                  .subscribe(
                    rs => { window.alert("Orden de compra generada. Se ha enviado una copia a su correo.")},
                    er => {}
                  )
        }
      )
        }
      )
    }
  }
}


guardarItem(item) {
    this.servicio.addItem(item)
    .subscribe(
      rs => console.log(rs),
      er => {},
      () => {console.log("Listo 6");}
    )
}

parseJwt(token){
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-','+').replace('_','/');
        return JSON.parse(window.atob(base64));
    }

}
