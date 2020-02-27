import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente, ClienteResponse, Region } from '../../interfaces/api';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  regiones: Region[];
  titulo = 'Crear Cliente';
  errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  private cargarCliente() {
    this.activatedroute.params.subscribe(params => {
      const id = params['id'.toString()];
      if (id) {
        this.clienteService.getCliente(id).subscribe((clienteResp: Cliente) => {
          console.log(clienteResp);
          this.cliente = clienteResp;
        });
      }
    });
    this.clienteService.getRegiones().subscribe((regiones: Region[]) => {
      this.regiones = regiones;
    });
  }

  public create() {
    // console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe((clienteResp: ClienteResponse) => {
      Swal.fire({
        icon: 'success',
        title: 'Nuevo cliente',
        text: `Cliente ${clienteResp.cliente.nombre} ${clienteResp.cliente.apellido} creado con éxito`,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/clientes']);
    }, err => {
      this.errores = err.error.errors;
      console.error(err.status);
      console.error(err.error.errors);
    });
  }

  public update() {
    this.clienteService.update(this.cliente).subscribe((clienteActualizado: ClienteResponse) => {
      Swal.fire({
        icon: 'success',
        title: 'Cliente actualizado',
        text: `Cliente ${clienteActualizado.cliente.nombre} ${clienteActualizado.cliente.apellido} actualizado con éxito`,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/clientes']);
    }, err => {
      this.errores = err.error.errors;
      console.error(err.status);
      console.error(err.error.errors);
    });
  }

  compararRegion(o1: Region, o2: Region) {
    if (o1 === null || o2 === null || o1 === undefined || o2 === undefined) {
      return false;
    } else if (o1.id === o2.id) {
      return true;
    } else {
      return false;
    }
  }

}
