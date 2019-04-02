import { Usuario } from './usuario';

export interface Tarea {
  tareaId: number;
  fechaCreacion: string;
  fechaEjecucion: string;
  estado: true;
  usuario: Usuario;
}
