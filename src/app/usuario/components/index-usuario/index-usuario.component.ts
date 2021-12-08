import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/core/models/rol.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { RolService } from 'src/app/core/service/rol.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-index-usuario',
  templateUrl: './index-usuario.component.html',
  styleUrls: ['./index-usuario.component.css']
})
export class IndexUsuarioComponent implements OnInit {

  usuarios!:Usuario[];
  roles!:Rol[];
  usuario:Usuario = {
    rol: {id: 0},
    estado: 'A'
  };

  query: string = "";
  action: string = "create";

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.fetchUsuarios();
    this.fetchRoles();
  }

  fetchUsuarios() {
    this.usuarioService.getAllUsuarios()
    .subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }

  fetchRoles() {
    this.rolService.getAllRoles()
    .subscribe(roles => {
      this.roles = roles;
    })
  }

  sendData(usuario?: Usuario, action?: string){
    if(action){
      this.action = action;
    }
    if(usuario){
      this.usuario = usuario;
    }
    if(this,action == 'create'){
      this.cleanForm();
    }
  }

  search(){
    this.usuarioService.searchUsuario(this.query)
    .subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }

  cleanQuery(){
    this.query = "";
    this.fetchUsuarios();
  }

  cleanForm(){
    this.usuario = {
      rol: {id: 0},
      estado: 'A'
    };
    this.action = 'create';
  }

  save(){
    console.log(this.usuario);
    if(this.usuario.nombre != '' && this.usuario.estado != '' && this.usuario.rol.id != 0){
      if(this.action == 'create'){
        this.usuarioService.createUsuario(this.usuario).subscribe(response => {
          this.fetchUsuarios();
          this.cleanForm();
          Swal.fire({
            title: 'Exito!',
            text: 'Usuario creado correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        }, (error) => {
          if(error.status == 419){
            Swal.fire({
              title: 'Error!',
              text: 'Este usuario ya existe',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }else{
            Swal.fire({
              title: 'Error!',
              text: 'Ocurrio un error',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
      }else{
        if(this.usuario.id){
          this.usuarioService.updateUsuario(this.usuario.id.toString(), this.usuario).subscribe(response => {
            this.fetchUsuarios();
            this.cleanForm();
            Swal.fire({
              title: 'Exito!',
              text: 'Usuario actualizado correctamente',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          }, (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Ocurrio un error',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          })
        }
      }
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Por favor llene todos los campos',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }

  }

  delete(){
    if(this.usuario.id){
      this.usuarioService.deleteUsuario(this.usuario.id.toString()).subscribe(response => {
        this.fetchUsuarios();
        this.cleanForm();
        Swal.fire({
          title: 'Exito!',
          text: 'Usuario eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      })
    }
  }
}
