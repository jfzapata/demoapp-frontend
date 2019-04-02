import { Tarea } from './tarea';

export interface Usuario {
  usuarioId: number;
  nombres: string;
  apellidos: string;
  fechaCreacion: string;
  estado: boolean;
  tareas: Tarea[];
}
