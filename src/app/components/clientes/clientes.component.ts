import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente, ClienteResponse } from '../../interfaces/api';
import { ClienteService } from '../../services/cliente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientesPaginados(page).subscribe((clientesResp: Cliente[]) => {
        this.clientes = clientesResp;
      });
    });
  }

  public delete(cliente: Cliente) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe((clienteResp: ClienteResponse) => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          Swal.fire(
            '¡Eliminado!',
            clienteResp.mensaje,
            'success'
          );
        });
      }
    });
  }

}
