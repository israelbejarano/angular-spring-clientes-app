import { Routes, RouterModule } from '@angular/router';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form.component';
import { LoginComponent } from './components/usuarios/login.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/page/:page', component: ClientesComponent},
    {path: 'clientes/form', component: FormComponent},
    {path: 'clientes/form/:id', component: FormComponent},
    {path: 'login', component: LoginComponent}
];




export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
