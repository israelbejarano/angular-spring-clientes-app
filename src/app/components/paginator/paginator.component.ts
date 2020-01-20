import { Component, OnInit, Input } from '@angular/core';
import { ClientePaginadoResponse } from '../../interfaces/api';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginador: ClientePaginadoResponse;
  paginas: number[];

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: variable-name
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}
