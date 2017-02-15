export class OrdenCompra {
    constructor(
        public id: number,
        public fecha: string,
        public Usuario_id: string,
        public nombre: string,
        public apellido: string,
        public telefono: string,
        public direccion: string,
        public estado: number
    ){}
}
