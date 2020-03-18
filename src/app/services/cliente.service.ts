import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente, ClienteResponse, ClientePaginadoResponse, Region } from '../interfaces/api';

import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(): HttpHeaders {
    const token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e: any): boolean {
    if (e.status === 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status === 403) {
      Swal.fire('Acceso denegado', `${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }

  // como solo tenenmos el get de regiones no creo otro servicio aparte aplico la misma
  // logica que en backend
  public getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}/clientes/regiones`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
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
    return this.http.get<Cliente>(`${this.baseUrl}/clientes/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public create(cliente: Cliente): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(`${this.baseUrl}/clientes`, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        if (e.status === 400) {
          return throwError(e);
        }

        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  public update(cliente: Cliente): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(`${this.baseUrl}/clientes/${cliente.id}`,
                                cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        if (e.status === 400) {
          return throwError(e);
        }

        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  public delete(id: number): Observable<ClienteResponse> {
    return this.http.delete<ClienteResponse>(`${this.baseUrl}/clientes/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  public subirfoto(archivo: File, id: string): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    let httpHeaders = new HttpHeaders();
    const token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    const req = new HttpRequest('POST', `${this.baseUrl}/clientes/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });
    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
