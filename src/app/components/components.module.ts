import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ]
})
export class ComponentsModule { }
