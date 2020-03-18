import { Routes, RouterModule } from '@angular/router';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form.component';
import { LoginComponent } from './components/usuarios/login.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/page/:page', component: ClientesComponent},
    {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard]},
    {path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent}
];




export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
