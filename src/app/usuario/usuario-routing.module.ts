import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexUsuarioComponent } from './components/index-usuario/index-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: IndexUsuarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
