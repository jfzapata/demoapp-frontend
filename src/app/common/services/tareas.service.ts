import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

// Own
// Constants
import { API_URL } from '@app/common/constants/app';
// Types
import { Tarea } from '@app/common/types/interfaces/tarea';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private endPoint = `${API_URL}/tareas`;
  constructor(private http: HttpClient) { console.log(this.endPoint); }

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.endPoint, httpOptions);
  }

  getTareasByUsuarioId(usuarioId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.endPoint}/find-by-user/${usuarioId}`, httpOptions);
  }

  getTareaById(tareaId: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.endPoint}/${tareaId}`, httpOptions);
  }

  createTarea(tarea: Tarea): Observable<Tarea> {
    if (typeof tarea.fechaEjecucion !== 'string') {
      tarea.fechaEjecucion = moment(tarea.fechaEjecucion).format('YYYY-MM-DD');
    }
    return this.http.post<Tarea>(`${this.endPoint}`, tarea, httpOptions);
  }

  updateTarea(tarea: Tarea): Observable<Tarea> {
    if (typeof tarea.fechaEjecucion !== 'string') {
      tarea.fechaEjecucion = moment(tarea.fechaEjecucion).format('YYYY-MM-DD');
    }
    return this.http.put<Tarea>(`${this.endPoint}/${tarea.tareaId}`, tarea, httpOptions);
  }

  deleteTarea(tareaId: number): Observable<void> {
    return this.http.delete<void>(`${this.endPoint}/${tareaId}`, httpOptions);
  }

}
