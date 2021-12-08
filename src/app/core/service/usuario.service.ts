import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsuarios(){
    return this.http.get<Usuario[]>(environment.url_api + "/usuario");
  }

  getUsuario(id: string){
    return this.http.get<Usuario>(environment.url_api + "/usuario/" + id);
  }

  searchUsuario(query: string){
    return this.http.get<Usuario[]>(environment.url_api + "/usuario/query?nombre=" + query);
  }

  createUsuario(usuario:Usuario){
    return this.http.post(environment.url_api + "/usuario", usuario);
  }

  updateUsuario(id: string, changes: Partial<Usuario>){
    return this.http.put(environment.url_api + "/usuario/" + id, changes)
  }

  deleteUsuario(id:string){
    return this.http.delete(environment.url_api + "/usuario/" + id);
  }
}
