import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { ClienteResponse, ClientePaginadoResponse } from '../../interfaces/api';
import { Cliente } from '../../models/api';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador;
  clienteSeleccionado: Cliente;
  esAdmin: boolean;
  esUsuario: boolean;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute,
              private modalService: ModalService, private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientesPaginados(page).subscribe((clientesResp: ClientePaginadoResponse) => {
        this.clientes = clientesResp.content;
        this.paginador = clientesResp;
      });
    });
    this.modalService.notificarUpload.subscribe((cliente: Cliente) => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id === clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
    this.esAdmin = this.authService.hasRole('ROLE_ADMIN');
    this.esUsuario = this.authService.hasRole('ROLE_USER');
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

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
