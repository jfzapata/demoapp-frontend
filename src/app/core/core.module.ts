import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeComponent } from '@app/core/components/home/home.component';
import { UsuariosListComponent } from '@app/core/components/usuarios-list/usuarios-list.component';
import { TareasListComponent } from '@app/core/components/tareas-list/tareas-list.component';

@NgModule({
  declarations: [
  HomeComponent,
  UsuariosListComponent,
  TareasListComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
