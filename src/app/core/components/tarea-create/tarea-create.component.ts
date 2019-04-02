import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

// Own
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';
import { Tarea } from '@app/common/types/interfaces/tarea';
// Utils
import { presentToast } from '@app/common/utils/general';
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
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private tareasService: TareasService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios()
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.usuariosFiltered = this.usuarios;
    });

    if (this.router.url.indexOf('edit-tarea') !== -1) {
      this.route.params.subscribe(async (params: any) => {
        await this.tareasService.getTareaById(parseInt((params as any).id, null)).toPromise()
          .then((tarea: Tarea) => {
            this.isEdition = true;
            this.tarea = tarea;
            this.usuario.patchValue(this.tarea.usuario);
            this.buildForm();
          });
      });
    } else {
      this.buildForm();
    }
  }

  getNombreUsuario(value) {
    return value ? `${value.nombres} ${value.apellidos}` : '';
  }

  buildForm() {
    this.tareaForm = this.fb.group({
      tareaId: [this.tarea ? this.tarea.tareaId : ''],
      fechaCreacion: [this.tarea ? this.tarea.fechaCreacion : ''],
      fechaEjecucion: [this.tarea ? moment(this.tarea.fechaEjecucion, 'YYYY-MM-DD"').toDate() : ''],
      usuario: [this.tarea ? this.tarea.usuario : ''],
      estado: [this.tarea ? this.tarea.estado : true]
    });

    this.usuario.valueChanges.subscribe(val => {
      if (typeof val === 'string') {
        this.filterUsuarios(val);
      }
      if (typeof val === 'object') {
        this.tareaForm.get('usuario').patchValue(val);
        this.tareaForm.markAsDirty();
      }
    });
  }

  create() {
    const tarea: Tarea = this.tareaForm.value;
    if (!this.isEdition) {
      this.tareasService.createTarea(tarea)
        .subscribe(() => {
          presentToast('Tarea creada correctamente!', 'success');
          this.router.navigate(['/tareas']);
        }, () => {
          presentToast('Error al crear la tarea', 'error');
        });
    } else {
      this.tareasService.createTarea(tarea)
        .subscribe(() => {
          presentToast('Tarea editada correctamente!', 'success');
          this.router.navigate(['/tareas']);
        }, () => {
          presentToast('Error al editar la tarea', 'error');
        });
    }
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
