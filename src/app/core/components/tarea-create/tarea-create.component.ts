import { Component, OnInit } from '@angular/core';

// Own
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';
import { Tarea } from '@app/common/types/interfaces/tarea';
// Services
import { UsuariosService } from '@app/common/services/usuarios.service';
import { TareasService } from '@app/common/services/tareas.service';

@Component({
  selector: 'app-tarea-create',
  templateUrl: './tarea-create.component.html',
  styleUrls: ['./tarea-create.component.scss']
})
export class TareaCreateComponent implements OnInit {
  isEdition = false; // is edition?
  usuarios: Usuario[];
  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios()
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

}
