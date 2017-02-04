export class Usuario {
    constructor(
         public id: number,
         public correo: string,
         public contrasena: string,
         public nombre: string,
         public apellido: string,
         public direccion: string,
         public telefono: string,
         public TipoUsuario_id: number,
         public descripcion: string,
         public estado: number
    ){}
}
