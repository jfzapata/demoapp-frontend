import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// App modules
import { SharedModule } from '@app/shared/shared.module';

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
    MDBBootstrapModule.forRoot(),
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
