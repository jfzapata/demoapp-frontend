import { Component, OnInit } from '@angular/core';

// Own
// Types
import { Tarea } from '@app/common/types/interfaces/tarea';
import { ColumnDefinition } from '@app/common/types/interfaces/coumn-definition';
// Services
import { TareasService } from '@app/common/services/tareas.service';

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
  constructor(private tareasService: TareasService) { }

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
    ];
  }

  private getTareas() {
    this.tareasService.getTareas()
    .subscribe((tareas: Tarea[]) => {
      this.tareas = tareas;
    }, (err) => {

    });
  }

}
