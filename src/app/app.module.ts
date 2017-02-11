import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaxxcamRoutingModule } from './app-routing.module';
import { DataTableModule } from 'angular2-datatable';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AdminComponent } from './admin/admin.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioNuevoComponent } from './usuario/usuario-nuevo.component';
import { UsuarioVistaComponent } from './usuario/usuario-vista.component';
import { UsuarioEliminarComponent } from './usuario/usuario-eliminar.component';

import { TipoUsuarioComponent } from './tipoUsuario/tipoUsuario.component';
import { TipoUsuarioService } from './tipoUsuario/tipoUsuario.service';
import { TipoUsuarioNuevoComponent } from './tipoUsuario/tipoUsuario-nuevo.component';
import { TipoUsuarioVistaComponent } from './tipoUsuario/tipoUsuario-vista.component';
import { TipoUsuarioEliminarComponent } from './tipoUsuario/tipoUsuario-eliminar.component';

import { ProductoComponent } from './producto/producto.component';
import { ProductoService } from './producto/producto.service';
import { ProductoNuevoComponent } from './producto/producto-nuevo.component';
import { ProductoVistaComponent } from './producto/producto-vista.component';
import { ProductoEliminarComponent } from './producto/producto-eliminar.component';

import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaService } from './categoria/categoria.service';
import { CategoriaNuevoComponent } from './categoria/categoria-nuevo.component';
import { CategoriaVistaComponent } from './categoria/categoria-vista.component';
import { CategoriaEliminarComponent } from './categoria/categoria-eliminar.component';

import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { EtiquetaService } from './etiqueta/etiqueta.service';
import { EtiquetaNuevoComponent } from './etiqueta/etiqueta-nuevo.component';
import { EtiquetaVistaComponent } from './etiqueta/etiqueta-vista.component';
import { EtiquetaEliminarComponent } from './etiqueta/etiqueta-eliminar.component';

import { ImagenComponent } from './imagen/imagen.component';
import { ImagenService } from './imagen/imagen.service';
import { ImagenNuevoComponent } from './imagen/imagen-nuevo.component';
import { ImagenVistaComponent } from './imagen/imagen-vista.component';
import { ImagenEliminarComponent } from './imagen/imagen-eliminar.component';

import { OrdenCompraComponent } from './ordenCompra/ordenCompra.component';
import { OrdenCompraService } from './ordenCompra/ordenCompra.service';
import { OrdenCompraNuevoComponent } from './ordenCompra/ordenCompra-nuevo.component';
import { OrdenCompraVistaComponent } from './ordenCompra/ordenCompra-vista.component';
import { OrdenCompraEliminarComponent } from './ordenCompra/ordenCompra-eliminar.component';

import { AlertComponent } from './admin/alert.component';
import { CartComponent } from './navbar/cart.component';
import { EtiquetaProductoComponent } from './etiqueta-producto/etiqueta-producto.component';
import { EtiquetaProductoNuevoComponent } from './etiqueta-producto/etiqueta-producto-nuevo.component';
import { EtiquetaProductoEliminarComponent } from './etiqueta-producto/etiqueta-producto-eliminar.component';
import { EtiquetaProductoVistaComponent } from './etiqueta-producto/etiqueta-producto-vista.component';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, HomeComponent, CatalogoComponent, AdminComponent,
    UsuarioComponent, UsuarioNuevoComponent, UsuarioVistaComponent, UsuarioEliminarComponent,
    TipoUsuarioComponent, TipoUsuarioNuevoComponent, TipoUsuarioVistaComponent, TipoUsuarioEliminarComponent,
    ProductoComponent, ProductoNuevoComponent, ProductoVistaComponent, ProductoEliminarComponent,
    CategoriaComponent, CategoriaNuevoComponent, CategoriaVistaComponent, CategoriaEliminarComponent,
    EtiquetaComponent, EtiquetaNuevoComponent, EtiquetaVistaComponent, EtiquetaEliminarComponent,
    ImagenComponent, ImagenNuevoComponent, ImagenVistaComponent, ImagenEliminarComponent,
    OrdenCompraComponent, OrdenCompraNuevoComponent, OrdenCompraVistaComponent, OrdenCompraEliminarComponent,
    AlertComponent,
    CartComponent,
    EtiquetaProductoComponent,
    EtiquetaProductoNuevoComponent,
    EtiquetaProductoEliminarComponent,
    EtiquetaProductoVistaComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MaxxcamRoutingModule,
    DataTableModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
