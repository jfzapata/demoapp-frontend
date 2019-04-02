import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
  tareaForm: FormGroup;
  usuarios: Usuario[];
  usuariosFiltered: Usuario[];
  tarea: Tarea;
  statusOptions = [{
    value: true,
    text: 'Habilitado'
  },
  {
    value: false,
    text: 'Deshabilitado'
  }];
  usuario: FormControl = new FormControl('');
  constructor(private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private tareasService: TareasService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios()
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.usuariosFiltered = this.usuarios;
    });
    this.buildForm();

    this.usuario.valueChanges.subscribe(val => {
      if (typeof val === 'string') {
        this.filterUsuarios(val);
      }
      if (typeof val === 'object') {
        this.tareaForm.get('usuario').patchValue(val);
      }
    });
  }

  getNombreUsuario(value) {
    return value ? `${value.nombres} ${value.apellidos}` : '';
  }

  buildForm() {
    this.tareaForm = this.fb.group({
      tareaId: [this.tarea ? this.tarea.tareaId : ''],
      fechaCreacion: [this.tarea ? this.tarea.fechaCreacion : ''],
      fechaEjecucion: [this.tarea ? new Date(this.tarea.fechaEjecucion) : ''],
      usuario: [this.tarea ? this.tarea.usuario : ''],
      estado: [this.tarea ? this.tarea.estado : true]
    });
  }

  private filterUsuarios(val: string) {
    if (val.length > 0) {
      const filterValue = val.toLowerCase();

      this.usuariosFiltered = this.usuarios.filter(usuario => {
        const nombre = `${usuario.nombres} ${usuario.apellidos}`;
        return nombre.toLowerCase().indexOf(filterValue) === 0;
      });
    } else {
      this.usuariosFiltered = this.usuarios;
    }
  }

}
