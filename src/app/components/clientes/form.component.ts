import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
  }

  public create(): void {
    // console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe((clienteResp: Cliente) => {
      Swal.fire({
        icon: 'success',
        title: `Cliente ${clienteResp.nombre} ${clienteResp.apellido} creado con éxito`,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/clientes']);
    });
  }

}
