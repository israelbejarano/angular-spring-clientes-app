import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';

  constructor(private clienteService: ClienteService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  private cargarCliente() {
    this.activatedroute.params.subscribe(params => {
      const id = params['id'.toString()];
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente: Cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }

  public create() {
    // console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe((clienteResp: Cliente) => {
      Swal.fire({
        icon: 'success',
        title: 'Nuevo cliente',
        text: `Cliente ${clienteResp.nombre} ${clienteResp.apellido} creado con éxito`,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/clientes']);
    });
  }

  public update() {
    this.clienteService.update(this.cliente).subscribe((clienteActualizado: Cliente) => {
      Swal.fire({
        icon: 'success',
        title: 'Cliente actualizado',
        text: `Cliente ${clienteActualizado.nombre} ${clienteActualizado.apellido} actualizado con éxito`,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/clientes']);
    });
  }

}
