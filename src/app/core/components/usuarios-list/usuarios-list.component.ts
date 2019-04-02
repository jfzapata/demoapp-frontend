import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

// Own
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';
import { Tarea } from '@app/common/types/interfaces/tarea';
import { ColumnDefinition } from '@app/common/types/interfaces/coumn-definition';
// Services
import { UsuariosService } from '@app/common/services/usuarios.service';
import { TareasService } from '@app/common/services/tareas.service';
// Utils
import { presentToast } from '@app/common/utils/general';

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
    private tareasService: TareasService,
    private dialog: MatDialog) { }

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
      { headerName: 'Cantidad de tareas asignadas', width: 300, valueGetter: (params) => params.data.tareas.length },
      {
        headerName: 'Acciones',
        cellRenderer: 'rowActions',
        cellRendererParams: {
          actions: [
            {
              navigateFunction: (router: Router, params: any) => {
                router.navigate(['/edit-usuario', params.data.usuarioId]);
              },
              icon: 'edit',
              label: 'Editar'
            },
            {
              context: this,
              icon: 'delete',
              label: 'Eliminar'
            }
          ],
        }
      }
    ];
  }

  methodFromParent(params: any) {
    const usuario: Usuario = params.data;
    if (usuario.tareas.length > 0) {
      presentToast('El usuario aún tiene tareas asignadas!', 'error');
    } else {
      const dialogRef = this.dialog.open(DeleteUsuarioDialogComponent, {
        width: '300px',
        data: {
          usuario
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.usuariosService.deleteUsuario(usuario.usuarioId)
          .subscribe(() => {
            presentToast('Usuario eliminado!', 'success');
            this.getUsuarios();
          }, () => {
            presentToast('Error al eliminar el usuario!', 'error');
          });
        }
      });
    }
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
    }, () => {
      presentToast('Error al consultar usuarios!', 'error');
    });
  }

}

@Component({
  templateUrl: './delete-confirmation-template.html',
})
export class DeleteUsuarioDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
