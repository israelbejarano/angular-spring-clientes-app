import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/api';
import { Usuario } from '../../models/api';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Por favor Sign in';
  usuario: Usuario;

  constructor( private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login() {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Username o password vacías', 'error');
    }

    this.authService.login(this.usuario).subscribe((resp: LoginResponse) => {
      console.log(resp);
      this.authService.guardarUsuario(resp.access_token);
      this.authService.guardarToken(resp.access_token);
      const usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito`, 'success');
    }, err => {
      console.log(err);
      if (err.status === 400) {
        Swal.fire('Error Login', 'Username o password incorrectas', 'error');
      }
    });
  }

}
