import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ClienteService } from '../../../services/cliente.service';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/auth.service';
import { FacturaService } from '../../../services/factura.service';
import { Cliente, Factura } from '../../../models/api';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo = 'Detalle del cliente';
  @Input() cliente: Cliente;
  fotoSeleccionada: File;
  progreso = 0;
  esAdmin: boolean;

  constructor(private clienteService: ClienteService, public modalService: ModalService,
              private authService: AuthService, private facturaService: FacturaService) { }

  ngOnInit() {
    this.esAdmin = this.authService.hasRole('ROLE_ADMIN');
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
          this.modalService.notificarUpload.emit(this.cliente);
          Swal.fire('la foto se ha subido correctamente', responseBody.mensaje, 'success');
        }
      });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

  delete(factura: Factura) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar la factura ${factura.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!'
    }).then((result) => {
      if (result.value) {
        this.facturaService.delete(factura.id).subscribe(facturaResp => {
          this.cliente.facturas = this.cliente.facturas.filter(fac => fac !== factura);
          Swal.fire(
            '¡Eliminada!',
            `Factura ${factura.descripcion} eliminada con éxito`,
            'success'
          );
        });
      }
    });
  }

}
