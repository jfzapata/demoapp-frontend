import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Own
// Constants
import { API_URL } from '@app/common/constants/app';
// Types
import { Usuario } from '@app/common/types/interfaces/usuario';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private endPoint = `${API_URL}/usuarios`;
  constructor(private http: HttpClient) { console.log(this.endPoint); }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.endPoint, httpOptions);
  }

  getUsuarioById(usuarioId: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.endPoint}/${usuarioId}`, httpOptions);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.endPoint}`, usuario, httpOptions);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.endPoint}/${usuario.usuarioId}`, usuario, httpOptions);
  }

  deleteUsuario(usuarioId: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.endPoint}/${usuarioId}`, httpOptions);
  }

}
