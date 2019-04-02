import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Own
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';
// Utils
import { presentToast } from '@app/common/utils/general';
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
  constructor(private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.usuarioForm = this.fb.group({
      usuarioId: [this.usuario ? this.usuario.usuarioId : ''],
      nombres: [this.usuario ? this.usuario.nombres : '', Validators.required],
      apellidos: [this.usuario ? this.usuario.apellidos : '', Validators.required],
      fechaCreacion: [this.usuario ? this.usuario.fechaCreacion : ''],
      estado: [this.usuario ? this.usuario.estado : true]
    });
  }

  create() {
    const usuario: Usuario = this.usuarioForm.value;
    this.usuariosService.createUsuario(usuario)
    .subscribe(() => {
      presentToast('Usuario creado correctamente!', 'success');
      this.router.navigate(['/usuarios']);
    }, () => {
      presentToast('Error al crear el usuario', 'error');
    });
  }

}
