import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// App modules
import { SharedModule } from '@app/shared/shared.module';

// Components
import { HomeComponent } from '@app/core/components/home/home.component';
import { UsuariosListComponent } from '@app/core/components/usuarios-list/usuarios-list.component';
import { TareasListComponent } from '@app/core/components/tareas-list/tareas-list.component';
import { CreateUsuarioComponent } from '@app/core/components/create-usuario/create-usuario.component';
import { TareaCreateComponent } from '@app/core/components/tarea-create/tarea-create.component';

@NgModule({
  declarations: [
  HomeComponent,
  UsuariosListComponent,
  TareasListComponent,
  CreateUsuarioComponent,
  TareaCreateComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ]
})
export class CoreModule { }
