import { ItemFactura, Cliente } from './api';

export class Factura {
    id: number;
    descripcion: string;
    observacion: string;
    items: ItemFactura[] = [];
    cliente: Cliente;
    total: number;
    createAt: string;
}
