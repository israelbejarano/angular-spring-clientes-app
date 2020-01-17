import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';

  constructor() { }

  ngOnInit() {
  }

  public create(): void {
    console.log(this.cliente);
  }

}
