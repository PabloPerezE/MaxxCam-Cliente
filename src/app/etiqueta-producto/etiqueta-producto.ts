export class EtiquetaProducto {
    constructor(
        public id: number,
        public Etiqueta_id: number,
        public Producto_id: number,
        public etiqueta: string,
        public producto: string,
        public estado: number
    ){}
}
