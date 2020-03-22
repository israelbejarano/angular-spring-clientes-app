import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Factura, Cliente } from '../../models/api';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  titulo = 'Nueva Factura';
  factura: Factura = new Factura();
  autocompleteControl = new FormControl();
  productos: string[] = ['Mesa', 'Tablet', 'Sony', 'Samsung', 'Tv LG', 'Bicicleta'];
  productosFiltrados: Observable<string[]>;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe((cliente: Cliente) => {
        this.factura.cliente = cliente;
      });
    });
    this.productosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  }

}
