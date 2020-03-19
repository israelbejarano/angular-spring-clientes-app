import { Region, Factura } from './api';

export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    createAt: string;
    foto: string;
    region: Region;
    facturas: Factura[] = [];
}
