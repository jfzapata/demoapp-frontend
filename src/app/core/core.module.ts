import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// App modules
import { SharedModule } from '@app/shared/shared.module';

// Components
import { HomeComponent } from '@app/core/components/home/home.component';
import { UsuariosListComponent } from '@app/core/components/usuarios-list/usuarios-list.component';
import { TareasListComponent } from '@app/core/components/tareas-list/tareas-list.component';
import { CreateUsuarioComponent } from '@app/core/components/create-usuario/create-usuario.component';

@NgModule({
  declarations: [
  HomeComponent,
  UsuariosListComponent,
  TareasListComponent,
  CreateUsuarioComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CoreModule { }
