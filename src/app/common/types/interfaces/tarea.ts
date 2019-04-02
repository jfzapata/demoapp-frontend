import { Usuario } from './usuario';

export interface Tarea {
  tareaId: number;
  fechaCreacion: string;
  fechaEjecucion: string | Date;
  estado: true;
  usuario: Usuario;
}
