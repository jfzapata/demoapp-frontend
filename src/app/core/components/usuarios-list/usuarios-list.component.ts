import { Component, OnInit } from '@angular/core';

// Own
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';
// Services
import { UsuariosService } from '@app/common/services/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[]; // The records gonna be show
  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  private getUsuarios() {
    this.usuariosService.getUsuarios()
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    }, (err) => {

    });
  }

}
