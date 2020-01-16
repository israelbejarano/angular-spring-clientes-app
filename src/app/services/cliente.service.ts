import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get<Cliente[]>(this.baseUrl + 'clientes');
  }
}
