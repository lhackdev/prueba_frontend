import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol.model';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private http: HttpClient
  ) { }

  getAllRoles(){
    return this.http.get<Rol[]>(environment.url_api + "/rol");
  }
}
