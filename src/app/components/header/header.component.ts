import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/api';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaAutenticado: boolean;
  usuario: Usuario;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  logout() {
    Swal.fire('Logout', `${this.authService.usuario.username}, has cerrado sesión con éxito`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
