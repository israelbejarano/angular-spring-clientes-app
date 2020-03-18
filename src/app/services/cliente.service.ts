import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente, ClienteResponse, ClientePaginadoResponse, Region } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) { }

  // como solo tenenmos el get de regiones no creo otro servicio aparte aplico la misma
  // logica que en backend
  public getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}/clientes/regiones`);
  }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get( `${this.baseUrl}/clientes`).pipe(
      map((response: Cliente[]) => {
        const clientes = response;
        return clientes.map(cliente => {
          cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
      })
    );
  }

  public getClientesPaginados(page: number): Observable<ClientePaginadoResponse> {
    return this.http.get<ClientePaginadoResponse>( `${this.baseUrl}/clientes/page/${page}`);
  }

  public getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/clientes/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  public create(cliente: Cliente): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(`${this.baseUrl}/clientes`, cliente).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  public update(cliente: Cliente): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(`${this.baseUrl}/clientes/${cliente.id}`,
                                cliente).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  public delete(id: number): Observable<ClienteResponse> {
    return this.http.delete<ClienteResponse>(`${this.baseUrl}/clientes/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  public subirfoto(archivo: File, id: string): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.baseUrl}/clientes/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }
}
