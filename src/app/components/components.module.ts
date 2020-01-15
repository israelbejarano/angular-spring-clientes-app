import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ]
})
export class ComponentsModule { }
