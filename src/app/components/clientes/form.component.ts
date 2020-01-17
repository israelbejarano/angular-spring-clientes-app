import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
  }

  public create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe((clienteResp: Cliente) => {
      console.log(clienteResp);
    });
  }

}
