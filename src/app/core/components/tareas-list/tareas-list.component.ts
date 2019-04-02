import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Own
// Types
import { Tarea } from '@app/common/types/interfaces/tarea';
import { Usuario } from '@app/common/types/interfaces/usuario';
import { ColumnDefinition } from '@app/common/types/interfaces/coumn-definition';
// Services
import { TareasService } from '@app/common/services/tareas.service';
import { UsuariosService } from '@app/common/services/usuarios.service';
// Utils
import { presentToast } from '@app/common/utils/general';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.scss']
})
export class TareasListComponent implements OnInit {
  tareas: Tarea[]; // The records gonna be show
  columns: ColumnDefinition[]; // The colums for the table
  floatingActions = [{
    icon: 'add',
    route: '/create-tarea'
  }];
  tareasUsuario = false; // Should query tareas by usuario id
  nombreUsuario: string;
  usuarioId: number;
  constructor(private tareasService: TareasService,
    private usuariosService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.buildColums();
    if (this.router.url.indexOf('tareas-usuario') !== -1) {
      this.route.params.subscribe(async (params: any) => {
        this.tareasUsuario = true;
        this.usuarioId = parseInt(params.usuarioId, null);
        await this.usuariosService.getUsuarioById(this.usuarioId).toPromise()
        .then((usuario) => {
          this.nombreUsuario = `${usuario.nombres} ${usuario.apellidos}`;
        });
        this.getTareas(parseInt(params.usuarioId, null));
      });
    } else {
      this.getTareas();
    }
  }

  private buildColums() {
    this.columns = [
      { headerName: 'Fecha de Creación', field: 'fechaCreacion', sortable: true, filter: true },
      { headerName: 'Fecha de Ejecución', field: 'fechaEjecucion', sortable: true, filter: true },
      {
        headerName: 'Usuario asignado',
        valueGetter: (params) => `${params.data.usuario.nombres} ${params.data.usuario.apellidos}`,
        sortable: true,
        filter: true
      },
      { headerName: 'Estado', filter: true, valueGetter: (params) => params.data.estado ? 'Habilitado' : 'Deshabilitado' },
      {
        headerName: 'Acciones',
        cellRenderer: 'rowActions',
        cellRendererParams: {
          actions: [
            {
              navigateFunction: (router: Router, params: any) => {
                router.navigate(['/edit-tarea', params.data.tareaId]);
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
    const tarea: Tarea = params.data;
    const dialogRef = this.dialog.open(DeleteTareaDialogComponent, {
      width: '300px',
      data: {
        tarea
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tareasService.deleteTarea(tarea.tareaId)
          .subscribe(() => {
            presentToast('Tarea eliminada!', 'success');
            this.getTareas(this.usuarioId);
          }, () => {
            presentToast('Error al eliminar la tarea!', 'error');
          });
      }
    });
  }

  private getTareas(usuarioId?: number) {
    if (!usuarioId) {
      this.tareasService.getTareas()
        .subscribe((tareas: Tarea[]) => {
          this.tareas = tareas;
        }, (err) => {
          presentToast('Error al consultar las tareas!', 'error');
        });
    } else {
      this.tareasService.getTareasByUsuarioId(usuarioId)
        .subscribe((tareas: Tarea[]) => {
          this.tareas = tareas;
        }, (err) => {
          presentToast('Error al consultar las tareas!', 'error');
        });
    }
  }

}

@Component({
  templateUrl: './delete-confirmation-template.html',
})
export class DeleteTareaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTareaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
