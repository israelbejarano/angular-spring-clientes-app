import { Producto } from './api';
export class ItemFactura {
    producto: Producto;
    cantidad = 1;
    importe: number;

    // opcional porque lo calculamos en el back
    public calcularImporte(): number {
        return this.cantidad * this.producto.precio;
    }
}
