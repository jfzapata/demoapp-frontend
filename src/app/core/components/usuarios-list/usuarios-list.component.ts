import { Component, OnInit } from '@angular/core';

// Own
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';
import { Tarea } from '@app/common/types/interfaces/tarea';
import { ColumnDefinition } from '@app/common/types/interfaces/coumn-definition';
// Services
import { UsuariosService } from '@app/common/services/usuarios.service';
import { TareasService } from '@app/common/services/tareas.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[]; // The records gonna be show
  columns: ColumnDefinition[]; // The colums for the table
  floatingActions = [{
    icon: 'add',
    route: '/create-usuario'
  }];
  constructor(private usuariosService: UsuariosService,
    private tareasService: TareasService) { }

  ngOnInit() {
    this.buildColums();
    this.getUsuarios();
  }

  private buildColums() {
    this.columns = [
      { headerName: 'Nombres', field: 'nombres', sortable: true, filter: true },
      { headerName: 'Apellidos', field: 'apellidos', sortable: true, filter: true },
      { headerName: 'Fecha de Creación', field: 'fechaCreacion', sortable: true, filter: true },
      { headerName: 'Estado', filter: true, valueGetter: (params) => params.data.estado ? 'Habilitado' : 'Deshabilitado' },
      { headerName: 'Cantidad de tareas asignadas', width: 300, valueGetter: (params) => params.data.tareas.length }
    ];
  }

  private getUsuarios() {
    this.usuariosService.getUsuarios()
    .subscribe(async (usuarios: Usuario[]) => {
      for (let index = 0; index < usuarios.length; index++) {
        const usuario: Usuario = usuarios[index];
        await this.tareasService.getTareasByUsuarioId(usuario.usuarioId).toPromise()
        .then((tareas: Tarea[]) => usuario['tareas'] = tareas);
      }
      this.usuarios = usuarios;
    }, (err) => {

    });
  }

}
