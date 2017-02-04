export class Producto {
    constructor(
        public id: number,
        public descripcion: string,
        public detalle: string,
        public precio: number,
        public Categoria_id: number,
        public categoria: string,
        public estado: number
    ){}
}
