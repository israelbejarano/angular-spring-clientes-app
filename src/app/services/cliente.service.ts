import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  public getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
