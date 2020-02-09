import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente, ClienteResponse } from '../../../interfaces/api';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo = 'Detalle del cliente';
  cliente: Cliente;
  fotoSeleccionada: File;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe((clienteResp: Cliente) => {
          this.cliente = clienteResp;
        });
      }
    });
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirfoto(this.fotoSeleccionada, this.cliente.id.toString())
      .subscribe((response: ClienteResponse) => {
        console.log(response);
        this.cliente = response.cliente;
        Swal.fire('la foto se ha subido correctamente', response.mensaje, 'success');
      });
    }
  }

}
