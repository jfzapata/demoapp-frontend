import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Own
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';
// Services
import { UsuariosService } from '@app/common/services/usuarios.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent implements OnInit {
  isEdition = false; // is edition?
  usuario: Usuario;
  usuarioForm: FormGroup;
  statusOptions = [{
    value: true,
    text: 'Habilitado'
  },
  {
    value: false,
    text: 'Deshabilitado'
  }];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.usuarioForm = this.fb.group({
      usuarioId: [this.usuario ? this.usuario.usuarioId : ''],
      nombres: [this.usuario ? this.usuario.nombres : '', Validators.required],
      apellidos: [this.usuario ? this.usuario.apellidos : '', Validators.required],
      // fechaCreacion: [this.usuario ? this.usuario.fechaCreacion : '', Validators.required],
      estado: [this.usuario ? this.usuario.estado : true]
    });
  }

  create() {

  }

}
