import { Rol } from "./rol.model";

export interface Usuario {
  id?: number;
  nombre?: string;
  estado?: string;
  rol: Rol
}
