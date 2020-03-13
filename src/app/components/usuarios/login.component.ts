import { Component, OnInit } from '@angular/core';
import { Usuario, LoginResponse } from '../../interfaces/api';
import { Router } from '@angular/router';
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
