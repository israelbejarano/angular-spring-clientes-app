import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {id: 1, nombre: 'Israel', apellido: 'Bejarano', email: 'israel@correo.com', createAt: '2020-01-15'},
    {id: 2, nombre: 'Juan', apellido: 'Tamariz', email: 'juan@correo.com', createAt: '2020-01-15'},
    {id: 3, nombre: 'Rita', apellido: 'Fernández', email: 'rita@correo.com', createAt: '2020-01-15'},
    {id: 4, nombre: 'Pedro', apellido: 'Sillero', email: 'pedro@correo.com', createAt: '2020-01-15'},
    {id: 5, nombre: 'Ana', apellido: 'Sánchez', email: 'ana@correo.com', createAt: '2020-01-15'},
    {id: 6, nombre: 'Héctor', apellido: 'Almendro', email: 'hector@correo.com', createAt: '2020-01-15'},
    {id: 7, nombre: 'Lara', apellido: 'Alcalde', email: 'lara@correo.com', createAt: '2020-01-15'},
    {id: 8, nombre: 'Celia', apellido: 'Dominguez', email: 'celia@correo.com', createAt: '2020-01-15'},
    {id: 9, nombre: 'Germán', apellido: 'Cano', email: 'german@correo.com', createAt: '2020-01-15'},
    {id: 10, nombre: 'Alex', apellido: 'Panea', email: 'alex@correo.com', createAt: '2020-01-15'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
