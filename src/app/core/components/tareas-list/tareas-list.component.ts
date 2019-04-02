import { Component, OnInit } from '@angular/core';

// Own
// Types
import { Tarea } from '@app/common/types/interfaces/tarea';
// Services
import { TareasService } from '@app/common/services/tareas.service';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.scss']
})
export class TareasListComponent implements OnInit {
  tareas: Tarea[]; // The records gonna be show
  constructor(private tareasService: TareasService) { }

  ngOnInit() {
    this.getTareas();
  }

  private getTareas() {
    this.tareasService.getTareas()
    .subscribe((tareas: Tarea[]) => {
      this.tareas = tareas;
      console.log(this.tareas);
    }, (err) => {

    });
  }

}
