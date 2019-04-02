import { Component, OnInit } from '@angular/core';

// Own
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';
import { ColumnDefinition } from '@app/common/types/interfaces/coumn-definition';
// Services
import { UsuariosService } from '@app/common/services/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[]; // The records gonna be show
  colums: ColumnDefinition[]; // The colums for the table
  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.buildColums();
    this.getUsuarios();
  }

  private buildColums() {
    this.colums = [
      { headerName: 'Nombres', field: 'nombres' },
      { headerName: 'Apellidos', field: 'apellidos' },
      { headerName: 'Fecha de Creación', field: 'fechaCreacion' },
      { headerName: 'Estado', field: 'estado' },
      { headerName: 'Cantidad de tareas asignadas', valueGetter: (params) => params.data.tareas.length }
    ];
  }

  private getUsuarios() {
    this.usuariosService.getUsuarios()
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    }, (err) => {

    });
  }

}
