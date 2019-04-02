import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from '@app/core/components/home/home.component';
import { UsuariosListComponent } from '@app/core/components/usuarios-list/usuarios-list.component';
import { CreateUsuarioComponent } from '@app/core/components/create-usuario/create-usuario.component';
import { TareasListComponent } from '@app/core/components/tareas-list/tareas-list.component';
import { TareaCreateComponent } from '@app/core/components/tarea-create/tarea-create.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'usuarios',
  component: UsuariosListComponent
},
{
  path: 'create-usuario',
  component: CreateUsuarioComponent
},
{
  path: 'tareas',
  component: TareasListComponent
},
{
  path: 'create-tarea',
  component: TareaCreateComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
