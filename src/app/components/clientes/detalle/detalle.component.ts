import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente, ClienteResponse } from '../../../interfaces/api';

import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo = 'Detalle del cliente';
  cliente: Cliente;
  fotoSeleccionada: File;
  progreso = 0;

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
    this.progreso = 0;
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
      .subscribe((response: any) => {
        console.log(response);
        if (response.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round(100 * (response.loaded / response.total));
        } else if (response.type === HttpEventType.Response) {
          const responseBody = response.body;
          this.cliente = responseBody.cliente;
          Swal.fire('la foto se ha subido correctamente', responseBody.mensaje, 'success');
        }
      });
    }
  }

}
