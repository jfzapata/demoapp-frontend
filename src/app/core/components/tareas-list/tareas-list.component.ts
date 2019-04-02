import { Component, OnInit } from '@angular/core';

// Own
// Services
import { TareasService } from '@app/common/services/tareas.service';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.scss']
})
export class TareasListComponent implements OnInit {

  constructor(private tareasService: TareasService) { }

  ngOnInit() {
  }

}
