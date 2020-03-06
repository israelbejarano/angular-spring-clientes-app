import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/api';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Por favor Sign in';
  usuario: Usuario;

  constructor() {
    this.usuario = new Usuario();
   }

  ngOnInit() {
  }

  login() {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Username o password vacías', 'error');
    }
  }

}
