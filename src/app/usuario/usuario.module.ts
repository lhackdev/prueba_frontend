import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexUsuarioComponent } from './components/index-usuario/index-usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IndexUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule
  ]
})
export class UsuarioModule { }
