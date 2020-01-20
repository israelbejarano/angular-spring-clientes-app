import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../interfaces/api';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo: 'Detalle del cliente';
  cliente: Cliente;

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

}
