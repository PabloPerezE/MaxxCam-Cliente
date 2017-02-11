import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthManager } from './authmanager';
import { HomeComponent } from './home/home.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AdminComponent } from './admin/admin.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioNuevoComponent } from './usuario/usuario-nuevo.component';
import { UsuarioVistaComponent } from './usuario/usuario-vista.component';
import { UsuarioEliminarComponent } from './usuario/usuario-eliminar.component';

import { TipoUsuarioComponent } from './tipoUsuario/tipoUsuario.component';
import { TipoUsuarioNuevoComponent } from './tipoUsuario/tipoUsuario-nuevo.component';
import { TipoUsuarioVistaComponent } from './tipoUsuario/tipoUsuario-vista.component';
import { TipoUsuarioEliminarComponent } from './tipoUsuario/tipoUsuario-eliminar.component';

import { ProductoComponent } from './producto/producto.component';
import { ProductoNuevoComponent } from './producto/producto-nuevo.component';
import { ProductoVistaComponent } from './producto/producto-vista.component';
import { ProductoEliminarComponent } from './producto/producto-eliminar.component';

import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaNuevoComponent } from './categoria/categoria-nuevo.component';
import { CategoriaVistaComponent } from './categoria/categoria-vista.component';
import { CategoriaEliminarComponent } from './categoria/categoria-eliminar.component';

import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { EtiquetaNuevoComponent } from './etiqueta/etiqueta-nuevo.component';
import { EtiquetaVistaComponent } from './etiqueta/etiqueta-vista.component';
import { EtiquetaEliminarComponent } from './etiqueta/etiqueta-eliminar.component';

import { EtiquetaProductoComponent } from './etiqueta-producto/etiqueta-producto.component';
import { EtiquetaProductoNuevoComponent } from './etiqueta-producto/etiqueta-producto-nuevo.component';
import { EtiquetaProductoVistaComponent } from './etiqueta-producto/etiqueta-producto-vista.component';
import { EtiquetaProductoEliminarComponent } from './etiqueta-producto/etiqueta-producto-eliminar.component';

import { ImagenComponent } from './imagen/imagen.component';
import { ImagenNuevoComponent } from './imagen/imagen-nuevo.component';
import { ImagenVistaComponent } from './imagen/imagen-vista.component';
import { ImagenEliminarComponent } from './imagen/imagen-eliminar.component';

import { OrdenCompraComponent } from './ordenCompra/ordenCompra.component';
import { OrdenCompraNuevoComponent } from './ordenCompra/ordenCompra-nuevo.component';
import { OrdenCompraVistaComponent } from './ordenCompra/ordenCompra-vista.component';
import { OrdenCompraEliminarComponent } from './ordenCompra/ordenCompra-eliminar.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Maxxcam'}},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'catalogo/:categoria', component: CatalogoComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthManager] ,children: [
    { path: ''},
    { path: 'usuarios', component: UsuarioComponent, children: [
      { path: ''},
      { path: 'usuario-vista', component: UsuarioVistaComponent},
      { path: 'usuario-vista/:id', component: UsuarioVistaComponent},
      { path: 'usuario-papelera', component: UsuarioEliminarComponent},
      { path: 'usuario-nuevo', component: UsuarioNuevoComponent},
    ]},
    { path: 'tipoUsuarios', component: TipoUsuarioComponent, children: [
      { path: ''},
      { path: 'tipoUsuario-vista', component: TipoUsuarioVistaComponent},
      { path: 'tipoUsuario-vista/:id', component: TipoUsuarioVistaComponent},
      { path: 'tipoUsuario-papelera', component: TipoUsuarioEliminarComponent},
      { path: 'tipoUsuario-nuevo', component: TipoUsuarioNuevoComponent},
    ]},
    { path: 'productos', component: ProductoComponent, children: [
      { path: ''},
      { path: 'producto-vista', component: ProductoVistaComponent},
      { path: 'producto-vista/:id', component: ProductoVistaComponent},
      { path: 'producto-papelera', component: ProductoEliminarComponent},
      { path: 'producto-nuevo', component: ProductoNuevoComponent},
    ]},
    { path: 'categorias', component: CategoriaComponent, children: [
      { path: ''},
      { path: 'categoria-vista', component: CategoriaVistaComponent},
      { path: 'categoria-vista/:id', component: CategoriaVistaComponent},
      { path: 'categoria-papelera', component: CategoriaEliminarComponent},
      { path: 'categoria-nuevo', component: CategoriaNuevoComponent},
    ]},
    { path: 'etiquetas', component: EtiquetaComponent, children: [
      { path: ''},
      { path: 'etiqueta-vista', component: EtiquetaVistaComponent},
      { path: 'etiqueta-vista/:id', component: EtiquetaVistaComponent},
      { path: 'etiqueta-papelera', component: EtiquetaEliminarComponent},
      { path: 'etiqueta-nuevo', component: EtiquetaNuevoComponent},
    ]},
    { path: 'etiquetas-producto', component: EtiquetaProductoComponent, children: [
      { path: ''},
      { path: 'etiqueta-producto-vista', component: EtiquetaProductoVistaComponent},
      { path: 'etiqueta-producto-vista/:id', component: EtiquetaProductoVistaComponent},
      { path: 'etiqueta-producto-papelera', component: EtiquetaProductoEliminarComponent},
      { path: 'etiqueta-producto-nuevo', component: EtiquetaProductoNuevoComponent},
    ]},
    { path: 'imagenes', component: ImagenComponent, children: [
      { path: ''},
      { path: 'imagen-vista', component: ImagenVistaComponent},
      { path: 'imagen-vista/:id', component: ImagenVistaComponent},
      { path: 'imagen-papelera', component: ImagenEliminarComponent},
      { path: 'imagen-nuevo', component: ImagenNuevoComponent},
    ]},
    { path: 'ordenesCompra', component: OrdenCompraComponent, children: [
      { path: ''},
      { path: 'ordenCompra-vista', component: OrdenCompraVistaComponent},
      { path: 'ordenCompra-vista/:id', component: OrdenCompraVistaComponent},
      { path: 'ordenCompra-papelera', component: OrdenCompraEliminarComponent},
      { path: 'ordenCompra-nuevo', component: OrdenCompraNuevoComponent},
    ]},
  ]},
  { path: '**', redirectTo: '/home', pathMatch: 'full'},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  providers: [ AuthManager ]
})
export class MaxxcamRoutingModule { }
