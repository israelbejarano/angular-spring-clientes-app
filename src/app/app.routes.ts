import { Routes, RouterModule } from '@angular/router';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form.component';
import { LoginComponent } from './components/usuarios/login.component';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const appRoutes: Routes = [
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/page/:page', component: ClientesComponent},
    {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    {path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    {path: 'login', component: LoginComponent},
    {path: 'facturas/:id', component: DetalleFacturaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
    {path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}}
];




export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
