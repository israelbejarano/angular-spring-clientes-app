import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { CLIENTES } from '../components/clientes/clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  public getClientes(): Cliente[] {
    return CLIENTES;
  }
}
