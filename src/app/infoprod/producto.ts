export class Producto {
    constructor(
        public id: number,
        public imagen,
        public descripcion: string,
        public detalle: string,
        public precio: number,
        public categoria: string,
    ){}
}
