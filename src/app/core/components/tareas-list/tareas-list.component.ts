import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Own
// Types
import { Tarea } from '@app/common/types/interfaces/tarea';
import { ColumnDefinition } from '@app/common/types/interfaces/coumn-definition';
// Services
import { TareasService } from '@app/common/services/tareas.service';
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
  constructor(private tareasService: TareasService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.buildColums();
    this.getTareas();
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
        /*this.tareasService.deleteTarea(tarea.tareaId)
          .subscribe(() => {
            presentToast('Tarea eliminada!', 'success');
            this.getTareas();
          }, () => {
            presentToast('Error al eliminar la tarea!', 'error');
          });*/
          console.log('eliminar tarea');
      }
    });
  }

  private getTareas() {
    this.tareasService.getTareas()
    .subscribe((tareas: Tarea[]) => {
      this.tareas = tareas;
    }, (err) => {

    });
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
